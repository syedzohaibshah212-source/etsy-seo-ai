type UploadBoxProps = {
  preview: string | null
  onImageChange: (file: File) => void
}

export default function UploadBox({
  preview,
  onImageChange,
}: UploadBoxProps) {
  return (
    <div className="uploadBox">
      <label className="uploadLabel">
        <input
          className="uploadInput"
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onImageChange(file)
          }}
        />

        {preview ? (
          <img
            src={preview}
            alt="Uploaded product preview"
            className="uploadPreview"
          />
        ) : (
          <div className="uploadEmpty">
            <div className="uploadIcon">＋</div>
            <span>Upload Product Image</span>
            <p>PNG or JPG image supported</p>
          </div>
        )}
      </label>
    </div>
  )
}