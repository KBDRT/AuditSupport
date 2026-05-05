import { renderAsync } from 'docx-preview';
import { CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { getEduProgram } from '@/api/edu-program/edu-program';
import { axiosInstance } from '@/services/axiosInstanse';
import { useEffect } from 'react';

interface PreviewProgramFileProps {
  versionId: string
  onClose: () => void
}

const PreviewProgramFile = ({ versionId, onClose}: PreviewProgramFileProps) => {
  const api = getEduProgram(axiosInstance);

  const previewDocx = async (arrayBuffer: ArrayBuffer) => {
    const container = document.getElementById('docx-preview');
    if (!container) return;
    
    container.innerHTML = '';
    
    await renderAsync(arrayBuffer, container);
  };

  useEffect(() => {
    const loadFileFromBackend = async () => {
    try {
      const response = await api.getEduProgramVersionFileVersionId(
        versionId,
        { responseType: 'blob' }
      );
      
      if (response.status === 200) {
        const arrayBuffer = await response.data.arrayBuffer();
 
        await previewDocx(arrayBuffer);
      }
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
    }
    };
      loadFileFromBackend();
    }, [versionId]);

  return (
    <>
      <Dialog.Root 
      size="full" 
        motionPreset="slide-in-bottom" 
        open={true} 
        onOpenChange={(details) => {
          if (!details.open) {
            onClose()
          }
      }}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content 
              display="flex" 
              flexDirection="column" 
              h="100vh" 
              maxH="100vh"
              m={0}
              borderRadius={0}
            >
              <Dialog.Header flexShrink={0}>
                <Dialog.Title>Просмотр документа</Dialog.Title>
              </Dialog.Header>
              
              <Dialog.Body 
                flex="1" 
                overflow="auto" 
                minH={0}  
              >
                <div 
                  id="docx-preview" 
                  style={{
                    height: '100%',
                    overflow: 'auto',
                  }}
                />
              </Dialog.Body>
              
              {/* <Dialog.Footer flexShrink={0}>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Закрыть</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer> */}
              
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={onClose}/>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default PreviewProgramFile;