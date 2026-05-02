import { Button, Dialog, Field, Input, Portal, Stack, CloseButton} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { MdSave  } from "react-icons/md";
import { useTeacherProgramsStore } from "@/stores/TeacherProgramsStore";

interface ProgramCreateInvalidFields {
  name: boolean,
}

interface ProgramCreateProps {
  yearId: string,
  teacherId: string,
  onClose: () => void
}

// const wordSchema = z.object({
//   name: z.string().min(1),
// })


const ProgramCreate = ({ yearId, teacherId, onClose }: ProgramCreateProps) => {
  const [programName, setProgramName] = useState<string>("");
  const [invalidFields, setInvalidFields] = useState<ProgramCreateInvalidFields>({name: false})
  const { addProgram } = useTeacherProgramsStore()

  useEffect(() => {
  }, [])

  const handleSave = async() => {

    if (programName.length == 0)
    {
      setInvalidFields({ name: true})
    }
    else
    {
      const isSuccess = await addProgram({agesOfChildrens: "", directionId: null, duration: "", name: programName, teacherId: teacherId, yearId: yearId})
      if (isSuccess) {
        onClose()
      }
    } 
  }

  return (
    <>
    <Dialog.Root 
      open={true}
      placement="top"
      onOpenChange={(details) => {
        if (!details.open) {
          onClose()
        }
      }}
    >
      <Portal>   
        <Dialog.Backdrop />    
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>Новая программа</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="2">
              <Stack gap="2">
                <Field.Root orientation="horizontal" invalid={invalidFields["name"]}>
                  <Field.Label>Название программы</Field.Label>
                  <Input
                    value={programName || ""}
                    onChange={(e) => {setProgramName(e.target.value); setInvalidFields({...invalidFields, name: false})}}
                    placeholder="Введите название программы"
                  />
                  <Field.ErrorText>Поля является обязательным</Field.ErrorText>
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button colorPalette="green" size="sm" onClick={handleSave} variant="ghost">
                <MdSave />Сохранить
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    </>
  )
}

export default ProgramCreate

