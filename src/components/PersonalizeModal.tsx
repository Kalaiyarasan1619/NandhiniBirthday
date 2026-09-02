import React, { useState } from 'react';
import { Settings, X, Upload, Check } from 'lucide-react';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  birthDate: string;
  title: string;
  message: string;
  photoUrl: string;
  onSave: (data: {
    name: string;
    birthDate: string;
    title: string;
    message: string;
    photoUrl: string;
  }) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  name: initialName,
  birthDate: initialBirthDate,
  title: initialTitle,
  message: initialMessage,
  photoUrl: initialPhotoUrl,
  onSave,
}) => {
  const [name, setName] = useState(initialName);
  const [birthDate, setBirthDate] = useState(initialBirthDate);
  const [title, setTitle] = useState(initialTitle);
  const [message, setMessage] = useState(initialMessage);
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, birthDate, title, message, photoUrl });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[1000] flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border-4 border-[#333]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#333] hover:text-[#ff7882] transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-6 font-titan text-2xl text-[#333]">
          <Settings className="w-7 h-7 text-[#ff7882]" />
          <h2>Personalize Birthday Wishes</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sriracha text-[#333]">
          <div>
            <label className="block text-sm font-bold mb-1">Name / Nickname</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-[#333] focus:border-[#ff7882] outline-none font-sans"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Date of Birth</label>
            <input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-[#333] focus:border-[#ff7882] outline-none font-sans"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Letter Header Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-[#333] focus:border-[#ff7882] outline-none font-sans"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Custom Letter Message</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-[#333] focus:border-[#ff7882] outline-none font-sans resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Profile Photo</label>
            <div className="flex items-center gap-4">
              <img
                src={photoUrl || '/images/img.png'}
                alt="Preview"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#333]"
              />
              <label className="flex items-center gap-2 bg-[#feecea] hover:bg-[#ff7882] hover:text-white px-4 py-2 rounded-xl border-2 border-[#333] cursor-pointer transition-colors text-sm font-bold">
                <Upload className="w-4 h-4" />
                Upload New Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border-2 border-[#333] font-bold hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#ff7882] hover:bg-[#F61F1F] text-white rounded-full border-2 border-[#333] font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Check className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
