import React, { useState } from 'react'
import { useWorkStore } from '../store/work.js';
import { Box, Button, Container, FileUpload, Heading, Icon, Input, VStack } from '@chakra-ui/react';
import { Toaster, toaster } from "../components/ui/toaster.jsx";
import { TfiUpload } from "react-icons/tfi";

export const CreatePage_org = () => {
  const [newWork, setNewWork] = useState({
    title: '',
    descript: '',
    thumbnail: '',
    image: [],
    tag: []
  });
  const { createWork } = useWorkStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  
  
  
  
  const handleFileChange = (e) => {
    
    setSelectedFile(e.target.files[0])
    console.log(e.target.files[0]);
    // e.target.value = "";
    // selectedFile && console.log('선택된 파일 : ', selectedFile);
  }
  
  
  const handleAddWork = async (e) => { 
    const { success, message } = await createWork(newWork)

    e.preventDefault();    
    console.log("파일 업로드 시작:", selectedFile);
        
        
    if (!selectedFile) {
      setUploadStatus('파일을 선택해주세요.')
      return;     
    }
    
    const formData = new FormData();
      formData.append('file', selectedFile);
      
      try {
        const res = await fetch('/api/works/upload', {
          method: 'POST',          
          body: formData
        })       
        
        toaster.create({
        description: setUploadStatus('업로드 성공: ' + res.data.filePath),
        type: 'success',
        });
        
      } catch (error) {
        toaster.create({
        description: setUploadStatus('업로드 실패: ' + error.message),
        type: 'error',
        });
        setUploadStatus('업로드 실패: ' + error.message)
    }
    
    
    
    if (!success) {
      console.log('Error');
      toaster.create({
        description: message,
        type: 'error',
      });
    } else {
      console.log('Success');
      toaster.create({
        description: message,
        type: 'success',
      });
    }
    
    // setNewWork({ title: '', descript: '', thumbnail: '', image: [], tag: [] })
  }
  
  // const handleAddWork = async () => {
  //   const { success, message } = await createWork(newWork)
    
    
  //   if (!success) {
  //     console.log('Error');
  //     toaster.create({
  //       description: message,
  //       type: 'error',
  //     });
  //   } else {
  //     console.log('Success');
  //     toaster.create({
  //       description: message,
  //       type: 'success',
  //     });
  //   }
    
  //   setNewWork({title: '', descript: '', thumbnail: '', image: [], tag: []})
  // };

  
  
  return (
    <Container
      width='800px'
      display={'flex'}
      flexDir={'column'}
      paddingTop='200px'
    >
      <VStack>
        <Heading marginBottom='3rem'>Create New Work</Heading>

        <Box w='full'>
          <VStack>
            <Input
              placeholder='Title...'
              name='title'
              value={newWork.title}
              onChange={e => setNewWork({...newWork, title: e.target.value})}
            />
            <Input
              placeholder='description...'
              name='descript'
              value={newWork.descript}
              onChange={e => setNewWork({...newWork, descript: e.target.value})}
            />
            {/* <Input
              placeholder='Thumbnail...'
              name='thumbnail'
              value={newWork.thumbnail}
              onChange={e => setNewWork({...newWork, thumbnail: e.target.value})}
            /> */}
            <FileUpload.Root onChange={handleFileChange} value={selectedFile} >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant='outline' size='sm' >
                  <TfiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List showSize clearable />
            </FileUpload.Root>
            <FileUpload.Root alignItems='stretch' maxFiles={10} >
              <FileUpload.HiddenInput />
              <FileUpload.Dropzone>
                <Icon size='md' color='fg.muted'>
                  <TfiUpload />
                </Icon>
                <FileUpload.DropzoneContent>
                  <Box>Drag and drop files here</Box>
                  <Box color='fg.muted'>.png, .jpg up to 5MB</Box>
                </FileUpload.DropzoneContent>
              </FileUpload.Dropzone>
              <FileUpload.List />
            </FileUpload.Root>
            <Input
              placeholder='Tag...'
              name='tag'
              value={newWork.tag}
              onChange={e => setNewWork({...newWork, tag: e.target.value})}
            />
            <Button size={'lg'} marginTop='1.75rem' onClick={handleAddWork }>
              Add Work
            </Button>
            
            <Toaster />
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
