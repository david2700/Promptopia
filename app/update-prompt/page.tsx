'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@/components/Form';


const EditPrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
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
     }, [promptId])

    const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
          const response = await fetch('/api/prompt/new', 
            {
              method: 'POST',
              body: JSON.stringify({
                prompt: post.prompt,
                userId: session?.user.id,
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
        type="Update"
        post={post}
        setPost={setPost}
        submitting={isSubmitting}
        handleSubmit={createPrompt}
    />
  )
}

export default EditPrompt;