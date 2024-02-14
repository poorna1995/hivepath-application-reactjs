import React from "react";
import FilerobotImageEditor from "filerobot-image-editor";

const HivepathImageEditor = ({ show, src, onClose, onComplete }) => {
  return (
    <FilerobotImageEditor
      show={show}
      src={src}
      onClose={onClose}
      config={config}
      finishButtonLabel="Save"
      colorScheme="light"
      onBeforeComplete={onComplete}
      onComplete={(props) => {
        console.log(props);
        return false;
      }}
    />
  );
};

export default HivepathImageEditor;

const config = {
  tools: ["adjust", "effects", "filters", "rotate", "text"],
  isLowQualityPreview: true,
  colorScheme: "light",
  theme: {
    colors: {
      primaryBg: "#ffffff",
      primaryBgHover: "#f2f2f2",
      secondaryBg: "#fff",
      secondaryBgHover: "#DFE7ED",
      secondaryBgOpacity: "rgba(255,255,255, 0.75)",
      text: "#5D6D7E",
      textHover: "#1a2329",
      textMute: "#aaa",
      textWarn: "#f7931e",
      accent: "#D5D8DC",
      button: {
        primary: "#484A9E",
        secondary: "#ffffff",
        border: "transparent",
        hover: "#5064ea",
        active: "#3c4ec7",
      },
      border: "#DFE7ED",
      borderLight: "#e1e1e1",
      disabledBg: "rgba(255, 0, 0, 0.1)",
    },
    fonts: [
      { label: "Arial", value: "Arial" },
      { label: "Tahoma", value: "Tahoma" },
      { label: "Times New Roman", value: "Times New Roman" },
      { label: "Courier", value: "Courier" },
      { label: "Courier New", value: "Courier New" },
      { label: "Verdana", value: "Verdana" },
    ],
  },
  translations: {
    en: {
      "header.image_editor_title": "Hivepath",
      "header.toggle_fullscreen": "Toggle fullscreen",
      "header.close": "Close",
      "header.close_modal": "Close window",
      "toolbar.download": "Save",
      "toolbar.save": "Save",
      "toolbar.apply": "Apply",
      "toolbar.saveAsNewImage": "Save As New Image",
      "toolbar.cancel": "Cancel",
      "toolbar.go_back": "Go Back",
      "toolbar.adjust": "Adjust",
      "toolbar.effects": "Effects",
      "toolbar.filters": "Filters",
      "toolbar.orientation": "Orientation",
      "toolbar.crop": "Crop",
      "toolbar.resize": "Resize",
      "toolbar.watermark": "Watermark",
      "toolbar.focus_point": "Focus point",
      "toolbar.shapes": "Shapes",
      "toolbar.image": "Image",
      "toolbar.text": "Text",
      "adjust.brightness": "Brightness",
      "adjust.contrast": "Contrast",
      "adjust.exposure": "Exposure",
      "adjust.saturation": "Saturation",
      "orientation.rotate_l": "Rotate Left",
      "orientation.rotate_r": "Rotate Right",
      "orientation.flip_h": "Flip Horizontally",
      "orientation.flip_v": "Flip Vertically",
      "pre_resize.title":
        "Would you like to reduce resolution before editing the image?",
      "pre_resize.keep_original_resolution": "Keep original resolution",
      "pre_resize.resize_n_continue": "Resize & Continue",
      "footer.reset": "Reset",
      "footer.undo": "Undo",
      "footer.redo": "Redo",
      "spinner.label": "Processing...",
      "warning.too_big_resolution":
        "The resolution of the image is too big for the web. It can cause problems with Image Editor performance.",
      "common.x": "x",
      "common.y": "y",
      "common.width": "width",
      "common.height": "height",
      "common.custom": "custom",
      "common.original": "original",
      "common.square": "square",
      "common.opacity": "Opacity",
      "common.apply_watermark": "Apply watermark",
      "common.url": "URL",
      "common.upload": "Upload",
      "common.gallery": "Gallery",
      "common.text": "Add Text Here...",
    },
  },
};
