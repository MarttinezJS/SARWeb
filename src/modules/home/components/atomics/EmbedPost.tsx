import { Button, CircularProgress } from "@nextui-org/react";

interface EmbedPostProps {
  close: () => void;
}
export const EmbedPost = ({ close }: EmbedPostProps) => {
  return (
    <div>
      <div className="w-full flex justify-end">
        <Button
          color="danger"
          variant="shadow"
          className="absolute top-1/2 m-5"
          onPress={close}
        >
          Cerrar
        </Button>
      </div>
      <blockquote
        className="instagram-media w-full pt-4"
        data-instgrm-captioned="true"
        data-instgrm-permalink="https://www.instagram.com/reel/DA3zyITxqUp/?utm_source=ig_embed&utm_campaign=loading"
        data-instgrm-version={14}
      >
        <div style={{ padding: 16 }}>
          <a
            href="https://www.instagram.com/reel/DA3zyITxqUp/?utm_source=ig_embed&utm_campaign=loading"
            style={{
              background: "#FFFFFF",
              lineHeight: 0,
              padding: "0 0",
              textAlign: "center",
              textDecoration: "none",
              width: "100%",
            }}
            target="_blank"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  borderRadius: "50%",
                  flexGrow: 0,
                  height: 40,
                  marginRight: 14,
                  width: 40,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  justifyContent: "center",
                }}
              >
                {" "}
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    borderRadius: 4,
                    flexGrow: 0,
                    height: 14,
                    marginBottom: 6,
                    width: 100,
                  }}
                />{" "}
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    borderRadius: 4,
                    flexGrow: 0,
                    height: 14,
                    width: 60,
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <CircularProgress className="p-5" />
            </div>
          </a>
        </div>
      </blockquote>
    </div>
  );
};
