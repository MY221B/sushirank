import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddDishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDish: (name: string, image: string) => void;
}

export function AddDishModal({ open, onOpenChange, onAddDish }: AddDishModalProps) {
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState("https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddDish(name.trim(), imagePreview);
      setName("");
      setImagePreview("https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">新增菜品</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">菜品名称</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入菜品名称"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>图片预览</Label>
            <div className="flex justify-center">
              <img 
                src={imagePreview} 
                alt="预览" 
                className="w-32 h-32 object-cover rounded-lg border border-border"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">上传图片</Label>
            <Input
              ref={fileInputRef}
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
          </div>
          
          <button type="submit" className="wood-btn w-full">
            创建菜品
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
