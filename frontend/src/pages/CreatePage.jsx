import { Button, Container, Field, FileUpload, Heading, Icon, Input, VStack, Box, Fieldset } from '@chakra-ui/react';
import { Toaster, toaster } from "../components/ui/toaster";
import { TfiUpload } from "react-icons/tfi";
import { useState } from 'react';
import { useWorkStore } from '../store/work.js';


function CreatePage() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    descript: '',
    thumb: null,
    image: null,
    tag: ''
  });
  const { createWork } = useWorkStore();
  
  
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await createWork(formData)
    
    // if (!file) {
    //   alert('파일을 선택해 주세요')
    //   return;
    // }
    
    const data = new FormData();
    data.append('thumb', file);
    data.append('image', file);
    data.append('title', formData.title);
    data.append('descript', formData.descript);
    data.append('tag', formData.tag);
    
    try {
      const response = await fetch('/api/works/upload', {
        method: 'POST',
        body: data
      })
      
      if (!response.ok) {
        throw new Error('업로드 실패');
      }
      
      const result = await response.json();
      alert('업로드 성공: ' + result.message)
      toaster.create({
        description: message,
        type: 'success',
      });
    } catch (error) {
      console.error('업로드 오류 :', error);
      alert('업로드 중 오류 발생')
      toaster.create({
        description: message,
        type: 'error',
      });
    };
  
  
  };
  
  
  
  return (
    <Container
      width='800px'
      display={'flex'}
      flexDir={'column'}
      paddingTop='160px'
    >
      <VStack>
        <Heading marginBottom='3rem'>Create New Work</Heading>
        <Fieldset.Root >
          <Fieldset.Content css={{'--field-label-width': '20%'}}>
            <Field.Root orientation='horizontal'>
              <Field.Label>Title</Field.Label>
              <Input
                placeholder='Title...'
                name='title'
                value={formData.title}
                onChange={handleTextChange}
                flex='1'
              />
            </Field.Root>
            <Field.Root orientation='horizontal'>
              <Field.Label>Description</Field.Label>
              <Input
                placeholder='description...'
                name='descript'
                value={formData.descript}
                onChange={handleTextChange}
                flex='1'
              />
            </Field.Root>
            <Field.Root orientation='horizontal' onChange={handleFileChange}>
              <Field.Label>Thumbnail</Field.Label>
              <FileUpload.Root accept={['image/png']}>
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                  <Button variant='outline' size='sm'>
                    <TfiUpload /> Upload file
                  </Button>
                </FileUpload.Trigger>
                <FileUpload.List />
              </FileUpload.Root>
            </Field.Root>

            <Field.Root orientation='horizontal' onChange={handleFileChange}>
              <Field.Label>Images</Field.Label>
              <FileUpload.Root
                alignItems='stretch'
                maxFiles={10}
                accept={['image/png']}
              >
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
            <Field.Root orientation='horizontal'>
              <Field.Label>Tags</Field.Label>
              <Input
                placeholder='Tag...'
                name='tag'
                value={formData.tag}
                onChange={handleTextChange}
              />
            </Field.Root>

            <Toaster />
            <Button size='xl' marginTop='1.5rem' type='submit' onClick={handleSubmit}>
              Add Work
            </Button>
          </Fieldset.Content>
        </Fieldset.Root>

        <Toaster />
      </VStack>
    </Container>
  );
}

export default CreatePage