import { Tab, Tabs } from "@heroui/react";
import { NewsCard, RegisterNew } from "../components";
import { Key, useState } from "react";

export const News = () => {
  const [tabSelected, setTabSelected] = useState<Key>("create");
  return (
    <>
      <div className="flex justify-center pt-5">
        <Tabs
          color="primary"
          classNames={{ tabContent: "text-secondary font-bold" }}
          aria-label="Creación de noticias."
          onSelectionChange={setTabSelected}
          radius="full"
        >
          <Tab key="create" title="Crear noticia" />
          <Tab key="read" title="Noticias" />
        </Tabs>
      </div>
      <TabContent tabSelected={tabSelected} />
    </>
  );
};

interface TabContentProps {
  tabSelected: Key;
}

export const TabContent = ({ tabSelected }: TabContentProps) => {
  switch (tabSelected) {
    case "create":
      return <RegisterNew />;
    case "read":
      return <NewsCard />;
    default:
      return <></>;
  }
};
