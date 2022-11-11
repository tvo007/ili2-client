import { useState } from "react";

export default function useDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (fx) => {
    fx?.();
    //if function exists, then runs
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return { handleOpenDialog, handleCloseDialog, isDialogOpen };
}
