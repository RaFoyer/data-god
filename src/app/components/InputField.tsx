import React from 'react';

interface InputFieldProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  handleFileUpload: (file: File) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  handleFileUpload,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex items-center">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={1}
        />
        <button
          type="button"
          onClick={triggerFileUpload}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-none border-t border-b border-r"
        >
          📎
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        className="hidden"
      />
    </form>
  );
};

export default InputField;