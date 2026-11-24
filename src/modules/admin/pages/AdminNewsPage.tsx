import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { addToast } from "@heroui/toast";
import {
  MdAdd,
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineStarBorder,
  MdOutlineVisibility,
} from "react-icons/md";
import {
  AreaForm,
  CustomForm,
  Endpoints,
  formatShortDate,
  ImageForm,
  ImageWithFallback,
  InputForm,
  PaginatedTable,
  save,
  toFormData,
  type Action,
  type Column,
} from "../../../common";
import { useNewsStore } from "../../../hooks";
import { isEditorial, type News, type NewsFields } from "../../../models";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { NO_API_REASON } from "../components/ComingSoon";
import { FormModal } from "../components/FormModal";

const columns: Column<News>[] = [
  {
    id: "title",
    name: "Noticia",
    render: (news) => (
      <div className="flex min-w-0 items-center gap-3">
        <ImageWithFallback
          src={news.imageUrl}
          alt=""
          className="h-12 w-16 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="line-clamp-2 font-semibold">{news.title}</p>
          <p className="text-xs text-muted md:hidden">
            {news.sourceName} · {formatShortDate(news.createdDate)}
          </p>
        </div>
      </div>
    ),
  },
  { id: "sourceName", name: "Fuente", hideOnMobile: true },
  {
    id: "createdDate",
    name: "Fecha",
    hideOnMobile: true,
    render: (news) => <span className="whitespace-nowrap">{formatShortDate(news.createdDate)}</span>,
  },
  {
    id: "tipo",
    name: "Tipo",
    hideOnMobile: true,
    render: (news) => (
      <div className="flex flex-wrap gap-1">
        <Chip size="sm" variant="flat" color={isEditorial(news) ? "secondary" : "default"}>
          {isEditorial(news) ? "Redacción" : "Externa"}
        </Chip>
        {news.featured && (
          <Chip size="sm" variant="flat" color="primary" className="text-primary-900">
            Destacada
          </Chip>
        )}
      </div>
    ),
  },
];

export const AdminNewsPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const remember = useNewsStore((s) => s.remember);
  const [isFormOpen, setIsFormOpen] = useState(() => params.get("nueva") === "1");
  const [reloadKey, setReloadKey] = useState(0);

  const actions: Action<News>[] = [
    {
      label: "Ver en el sitio",
      icon: <MdOutlineVisibility aria-hidden="true" />,
      action: (news) => {
        remember([news]);
        navigate(`/noticias/${news.id}`);
      },
    },
    // Sin endpoints todavía: se muestran deshabilitadas.
    {
      label: "Destacar",
      icon: <MdOutlineStarBorder aria-hidden="true" />,
      action: () => {},
      disabled: true,
      disabledReason: NO_API_REASON,
    },
    {
      label: "Editar",
      icon: <MdOutlineEdit aria-hidden="true" />,
      action: () => {},
      disabled: true,
      disabledReason: NO_API_REASON,
    },
    {
      label: "Eliminar",
      icon: <MdDeleteOutline aria-hidden="true" />,
      color: "danger",
      action: () => {},
      disabled: true,
      disabledReason: NO_API_REASON,
    },
  ];

  return (
    <>
      <AdminPageHeader
        title="Noticias"
        description="Noticias de redacción y las que llegan automáticamente de medios externos. Destacar, editar y eliminar estarán disponibles cuando la API lo permita."
      >
        <Button
          color="secondary"
          startContent={<MdAdd aria-hidden="true" className="text-xl" />}
          onPress={() => setIsFormOpen(true)}
        >
          Nueva noticia
        </Button>
      </AdminPageHeader>

      <PaginatedTable<News>
        aria-label="Noticias publicadas"
        endpoint={Endpoints.NEWS}
        columns={columns}
        actions={actions}
        reloadKey={reloadKey}
        emptyContent="Todavía no hay noticias. Publica la primera con «Nueva noticia»."
      />

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Nueva noticia"
        description="Se publica de inmediato como noticia de redacción."
        size="3xl"
      >
        <CustomForm<NewsFields>
          aria-label="Nueva noticia"
          defaultValues={{ title: "", abstract: "", text: "", image: null }}
          submitLabel="Publicar noticia"
          loadingLabel="Publicando…"
          actions={
            <Button variant="light" color="secondary" onPress={() => setIsFormOpen(false)}>
              Cancelar
            </Button>
          }
          onSubmit={async (data) => {
            const resp = await save<News>(
              Endpoints.ADMIN_NEWS,
              toFormData({
                title: data.title.trim(),
                abstract: data.abstract.trim(),
                text: data.text.trim(),
                image: data.image,
              }),
            );
            if (resp.error) {
              addToast({
                title: "No se pudo publicar la noticia",
                description: resp.message,
                color: "danger",
              });
              return resp;
            }
            addToast({ title: "Noticia publicada", color: "success" });
            setReloadKey((key) => key + 1);
            setIsFormOpen(false);
            return resp;
          }}
        >
          <div className="space-y-5">
            <InputForm<NewsFields>
              name="title"
              label="Título"
              maxLength={200}
              rules={{
                required: "Escribe el título",
                validate: (value) => String(value).trim().length >= 5 || "Mínimo 5 caracteres",
              }}
            />
            <AreaForm<NewsFields>
              name="abstract"
              label="Resumen"
              description="Una o dos frases: aparece en las tarjetas y bajo el título."
              minRows={2}
              maxRows={4}
              maxLength={400}
              rules={{
                required: "Escribe el resumen",
                validate: (value) => String(value).trim().length >= 10 || "Mínimo 10 caracteres",
              }}
            />
            <AreaForm<NewsFields>
              name="text"
              label="Texto de la noticia"
              description="Separa los párrafos con una línea en blanco."
              minRows={6}
              maxRows={14}
              rules={{
                required: "Escribe el texto de la noticia",
                validate: (value) => String(value).trim().length >= 20 || "Mínimo 20 caracteres",
              }}
            />
            <ImageForm<NewsFields>
              name="image"
              label="Imagen principal"
              rules={{ required: "Sube una imagen para la noticia" }}
            />
          </div>
        </CustomForm>
      </FormModal>
    </>
  );
};
