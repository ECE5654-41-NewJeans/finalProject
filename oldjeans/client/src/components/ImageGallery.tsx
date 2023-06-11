import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import DialogTitle from "@material-ui/core/DialogTitle";

type Images = { id: string; download_url: string };

interface Props {
  isOpen: boolean;
  onImageSelect: (img: string) => void;
}

const ImageGalleryDialog: React.FC<Props> = (props) => {
  const [images, setImages] = useState<Array<Images>>([]);
  const { isOpen, onImageSelect } = props;

  useEffect(() => {
    fetch(
      `https://picsum.photos/v2/list?limit=12&page=3`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

  return (
    <Dialog open={isOpen} keepMounted aria-labelledby="dialog-slide-title">
      <DialogTitle id="dialog-slide-title">
        {"Select your image Profile"}
      </DialogTitle>
      <DialogContent>
        <GridList cellHeight={120} cols={3}>
          {images.map((img) => (
            <GridListTile
              style={{ cursor: "pointer", marginTop: "25px"}}
              key={img.id}
              cols={1}
              onClick={() => onImageSelect(img.download_url)}
            >
              <img src={img.download_url} alt="Display" />
            </GridListTile>
          ))}
        </GridList>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryDialog;
