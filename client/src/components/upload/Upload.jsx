import { useRef } from "react";

const Upload = ({ setImg }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      // For UI development - just log the file selection
      setImg((prev) => ({
        ...prev,
        isLoading: false,
        dbData: { fileName: file.name }
      }));
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
      <label onClick={() => fileInputRef.current.click()}>
        <img src="/attachment.png" alt="Attach file" />
      </label>
    </div>
  );
};

export default Upload;
