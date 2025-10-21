import { Frown } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "ui";

export default function ErrorComponent() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-full flex-col gap-3">
      <Frown size={64} />
      <h1>Oops... An error occurred</h1>
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </div>
  );
}
