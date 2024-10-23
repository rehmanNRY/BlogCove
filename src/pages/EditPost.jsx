import React, { useState } from 'react'
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/conf'; 

const EditPost = () => {
  const [post, setPost] = useState([])
  const {slug} = useParams()
  const navigate = useNavigate();
  useEffect(() => {
    if(slug){
      appwriteService.getPosts(slug).then((post)=>{
        if(post){
          setPost(post);
        }
      })
    }else{
      navigate('/')
    }
  }, [slug, navigate])
  
  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm />
      </Container>
    </div>
  ) : null;
}

export default EditPost