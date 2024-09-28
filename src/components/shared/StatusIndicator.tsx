import { Cancel01Icon, CheckmarkCircle01Icon } from "hugeicons-react";

interface StatusIndicatorProps {
  status: boolean | undefined;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  return (
    <div className="flex items-center">
      {status ? (
        <CheckmarkCircle01Icon className="text-green-500 w-5 h-5" />
      ) : (
        <Cancel01Icon className="text-red-500 w-5 h-5" />
      )}
      <span className="ml-2">{status ? "Active" : "Inactive"}</span>
    </div>
  );
};
