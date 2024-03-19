import { useState } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from "next/navigation";

export default function Contest() {
    const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");
    const id = useParams().id;
    const { mutateAsync: contest, isLoading } = useContractWrite(contract, "contest")

    const [name, setName] = useState("");
    const [profile, setProfile] = useState("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfile(event.target.value);
    };

    const handleSaveChanges = async () => {
        try {
            const data = await contest({ args: [id, name, profile]});
            console.info("contract call success", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Become Contestant</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" placeholder="Aniruddh Dubge" className="col-span-3" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Image
                        </Label>
                        <Input id="image" placeholder="profile image" className="col-span-3" value={profile} onChange={handleProfileChange} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
