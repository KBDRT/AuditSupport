import { Badge, Icon } from "@chakra-ui/react";
import { ProgramStatuses } from "@/api/models";
import { GetStatusConfig } from "@/utils/StatusConfig";

const StatusBadge = ({ status }: { status: ProgramStatuses }) => {
  const statusConfig = GetStatusConfig(status);
  
  return (
    <Badge
      colorPalette={statusConfig.colorPalette}
      w="140px"  
      textAlign="center" 
      display="inline-flex" 
      alignItems="center" 
      justifyContent="center"
      flexShrink={0}
    >
      <Icon as={statusConfig.icon} boxSize="12px" />
      {statusConfig.label}
    </Badge>
  );
};

export default StatusBadge
