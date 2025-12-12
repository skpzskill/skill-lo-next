import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface JoinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoinDialog = ({ open, onOpenChange }: JoinDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    parentEmail: "",
    parentName: "",
    mobile: "",
    childName: "",
    childAge: ""
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to Terms and Conditions & Privacy Policy",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Workshop Reserved!",
        description: "Thank you! We'll contact you soon about your free workshop.",
      });
      setIsSubmitting(false);
      onOpenChange(false);
      setFormData({ parentEmail: "", parentName: "", mobile: "", childName: "", childAge: "" });
      setAgreedToTerms(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-background to-secondary/20">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center font-bold">
            RESERVE YOUR <span className="text-orange-500">FREE</span> WORKSHOP
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="parentEmail">Parent's Email*</Label>
              <Input
                id="parentEmail"
                type="email"
                placeholder="Parent's Email*"
                value={formData.parentEmail}
                onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentName">Parent's Name*</Label>
              <Input
                id="parentName"
                placeholder="Parent's Name*"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                required
                className="bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile*</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Mobile*"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="childName">Child's Name</Label>
              <Input
                id="childName"
                placeholder="Child's Name"
                value={formData.childName}
                onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                className="bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="childAge">Select Child Age</Label>
            <Select value={formData.childAge} onValueChange={(value) => setFormData({ ...formData, childAge: value })}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Child Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5-7">5-7 years</SelectItem>
                <SelectItem value="8-10">8-10 years</SelectItem>
                <SelectItem value="11-13">11-13 years</SelectItem>
                <SelectItem value="14-16">14-16 years</SelectItem>
                <SelectItem value="17+">17+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to{" "}
              <a href="#" className="text-primary hover:underline">
                Terms and Conditions & Privacy Policy
              </a>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-6 text-lg"
          >
            {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
          </Button>

          <p className="text-center text-orange-500 font-bold text-lg">
            Few Seats Left!
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinDialog;
