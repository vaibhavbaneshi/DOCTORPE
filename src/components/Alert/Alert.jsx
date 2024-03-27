import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";


export function AlertSuccess() {
  return (
    <Alert status='success'>
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>
  )
}
