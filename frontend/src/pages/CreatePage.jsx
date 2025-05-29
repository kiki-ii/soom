import React, { useState } from 'react'
import { useWorkStore } from '../store/work.js';
import { Box, Button, Container, Field, Fieldset, FileUpload, Heading, Icon, Input, VStack } from '@chakra-ui/react';
import { Toaster, toaster } from "../components/ui/toaster";
import { TfiUpload } from "react-icons/tfi";

export const CreatePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    descript: '',
    thumbnail: '',
    image: [],
    tag: []
  });
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState('');
  
  const { createWork } = useWorkStore(); //NOTE:
  //const [selectedFile, setSelectedFile] = useState(null);
  
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file:file
      }))
              
    }
  }
  
  const handleSubmit = async (e) => {
    const { success, message } = await createWork(formData)
    
    e.preventDefault();
    setIsUploading(true);
    setUploadStatus('업로드 중...');

    if (!formData.title || !formData.descript) {
      setUploadStatus('제목과 파일은 필수 입력 항목입니다.');
      setIsUploading(false);
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('descript', formData.descript);
    data.append('thumbnail', formData.thumbnail);
    data.append('image', formData.image);
    data.append('tag', formData.tag);

    try {
      const response = await fetch('http://localhost:3000/api/works/upload', {
        method: 'POST',
        body: data
        // headers는 FormData를 사용할 때 브라우저가 자동으로 설정함
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setUploadStatus(`업로드 성공! 파일 경로: ${result.filePath}`);
      
      // 폼 초기화
      setFormData({
        title: '',
        description: '',
        thumbnail: '',
        image: [],
        tag:[],
      });
      
    } catch (error) {
      setUploadStatus(`업로드 실패: ${error.message}`);
      console.error('업로드 오류:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  
  /*
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
  */

  
  
  return (
    <Container
      width='1000px'
      display={'flex'}
      flexDir={'column'}
      paddingTop='200px'
    >
      <VStack>
        <Heading marginBottom='3rem'>Create New Work</Heading>

        <Fieldset.Root w='full' size="lg" onSubmit={handleSubmit}>
          <Fieldset.Content>
            <Field.Root className='createform'>
              <Field.Label>Title</Field.Label>
              <Input
                placeholder='Title...'
                name='title'
                value={formData.title}
                onChange={handleTextChange}
              />
            </Field.Root>
            <Field.Root className='createform'>
              <Field.Label>Description</Field.Label>
              <Input
              placeholder='description...'
              name='descript'
              value={formData.descript}
              onChange={handleTextChange}
              />  
            </Field.Root>
            <Field.Root className='createform'>
              <Field.Label>Thumbnail</Field.Label>
              <FileUpload.Root onChange={handleFileChange} name='thumbnail'>
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                  <Button variant='outline' size='sm' >
                    <TfiUpload /> Upload file
                  </Button>
                </FileUpload.Trigger>
                <FileUpload.List showSize clearable />
              </FileUpload.Root>
            </Field.Root>
            <Field.Root className='createform'>
              <Field.Label>Images</Field.Label>
              <FileUpload.Root alignItems='stretch' maxFiles={10} onChange={handleFileChange} name='thumbnail'>
                <FileUpload.HiddenInput />
                <FileUpload.Dropzone>
                  <Icon size='lg' color='fg.muted'>
                    <TfiUpload />
                  </Icon>
                  <FileUpload.DropzoneContent>
                    <Box>Drag and drop files here</Box>
                    <Box color='fg.muted'>.png, .jpg up to 5MB</Box>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List />
              </FileUpload.Root>
            </Field.Root>
            <Field.Root className='createform'>
              <Field.Label>Tags</Field.Label>
              <Input
                placeholder='Tag...'
                name='tag'
                value={formData.tag}
                onChange={handleTextChange}
              />
            </Field.Root>
            
            <Toaster />
          </Fieldset.Content>
            <Button disabled={isUploading} size='2xl' marginTop='3rem' type='submit'>
              Add Work
            </Button>
        </Fieldset.Root>
      </VStack>
    </Container>
  );
}
