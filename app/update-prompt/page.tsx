'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@/components/Form';


const EditPrompt = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => { 
      const getPromptDetails = async () => {
          const response = await fetch(`/api/prompt/${promptId}`)
          const data = await response.json();

          setPost({
            prompt: data.prompt,
            tag: data.tag,
          })
     }

     if (promptId) getPromptDetails();
    }, [promptId])

    const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!promptId) return alert('Prompt ID not found');

        try {
          const response = await fetch(`/api/prompt/${promptId}`, 
            {
              method: 'PATCH',
              body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
            })
          })

          if (response.ok) {
            router.push('/');
          }
        } catch (error) {
          console.log
        } finally {
          setIsSubmitting(false);
        }
    }

  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={isSubmitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt;