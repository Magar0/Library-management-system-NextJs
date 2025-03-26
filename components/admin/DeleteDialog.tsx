import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const DeleteDialog = ({
  userId,
  handleDeleteItem,
}: {
  userId: string;
  handleDeleteItem: (userId: string) => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await handleDeleteItem(userId);
    setLoading(false);
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(e) => setIsDialogOpen(e)}
      // modal={true}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="transition-all duration-300 hover:text-red-500"
        >
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete user and
            remove user's data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={loading} onClick={handleDelete}>
              {loading && <div className="loader"></div>}
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
