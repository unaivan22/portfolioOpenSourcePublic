import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import Footer from './Footer';
import supabase from './SupabaseClient';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import Check from './Check';
import { Dot, Download } from 'lucide-react';
import Nav from './utils/Nav';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error.message);
      return;
    }

    setBlogs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
    const interval = setInterval(fetchBlogs, 3600000);
    return () => clearInterval(interval);
  }, []);

  const formatCreatedAt = (createdAt) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(createdAt).toLocaleString('en-US', options);
  };

  const HtmlRenderer = ({ html }) => {
    const parsedHtml = parse(html, {
      replace: (domNode) => {
        if (domNode.type === 'text') {
          return domNode.data.trim();
        }
      },
    });

    return <>{parsedHtml}</>;
  };

  const getReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(/\s+/).length; // Split by spaces and count words
    return Math.ceil(words / wordsPerMinute); // Calculate minutes
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(blogs.length / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Nav />
      <div className='container mx-auto h-max min-h-screen mt-24'>
        <div className='flex items-center justify-center text-center leading-none px-12'>
          <h1 className='text-[4rem] lg:text-[6rem] font-bold'> <span className='opacity-30'>Hello I’m Dirga,</span> a passionate engineer specializing in digital solutions.</h1>
        </div>
        <div className='flex items-center justify-center text-center leading-none px-12 my-20'>
          <Button className='rounded-full text-xl py-8 px-10'> <Download className='mr-2' /> Resume</Button>
        </div>
        <div className='mt-32 mx-auto mb-2 gap-y-4 flex flex-col'>
          <h1 className='text-3xl font-semibold'>Selected Works</h1>
        </div>
        <div className='mx-auto mb-12 gap-y-20 flex flex-col blogslists'>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            currentBlogs.map(blogItem => (
              <Link to={`${blogItem.note_uuid}`} className='py-4 space-y-2' key={blogItem.id}>
                <img src={blogItem.thumbnail} className='show rounded-3xl mb-6'/>
                <div className='flex flex-wrap items-center justify-between'>
                  <h1 className='font-semibold text-4xl mb-4'>{blogItem.title}</h1>
                  <Button className='rounded-full text-xl py-8 px-6' variant='outline'>Detail</Button>
                </div>
                {/* <p className='text-sm line-clamp-2 font-light'><HtmlRenderer html={blogItem.note_text} /></p> */}
                {/* <div className='flex items-center'>
                  <p className='text-xs font-light text-muted-foreground'>{formatCreatedAt(blogItem.created_at)}</p>
                  <Dot className='text-stone-500' />
                  <p className='text-xs font-light text-muted-foreground'>{getReadingTime(blogItem.note_text)} min read</p>
                </div> */}
              </Link>
            ))
          )}
        </div>
        {/* <div className='flex justify-center mb-4'>
          <nav>
            <ul className='flex list-none'>
              {pageNumbers.map(number => (
                <li key={number} className='mx-1'>
                  <button onClick={() => paginate(number)} className={`h-8 w-8 text-xs rounded-lg ${currentPage === number ? 'bg-gray-800 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div> */}
        <div className='mt-12 mx-auto mb-2 gap-y-4 flex flex-col py-12'>
          <Footer />
        </div>
      </div>
    </div>
  );
}
