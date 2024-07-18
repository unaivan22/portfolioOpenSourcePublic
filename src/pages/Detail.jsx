import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Dot } from 'lucide-react';
import supabase from './SupabaseClient';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Nav from './utils/Nav';

const Detail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { noteNoteuuid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .eq('note_uuid', noteNoteuuid)
          .single();

        if (error) {
          console.error('Error fetching blog:', error.message);
          return;
        }

        setBlog(data);
        setNoteTitle(data.title);
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    fetchData();
  }, [noteNoteuuid]);

  const HtmlRenderer = ({ html }) => {
    const parsedHtml = parse(html, {
      replace: (domNode) => {
        if (domNode.type === 'text') {
          // Remove leading and trailing whitespaces
          return domNode.data.trim();
        }
      },
    });

    return <>{parsedHtml}</>;
  };

  const removeHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const plainText = doc.body.textContent || "";
    return plainText.trim().replace(/\n/g, " ");
  };

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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(/\s+/).length; // Split by spaces and count words
    return Math.ceil(words / wordsPerMinute); // Calculate minutes
  };

  if (isLoading) {
    return <div className='grid h-screen place-items-center text-muted-foreground font-light text-sm'>Loading...</div>; // Display a loading indicator while fetching data
  }

  if (!blog) {
    return <div className='grid h-screen place-items-center text-muted-foreground text-3xl pixel-typeface'>404 - Not found</div>; // Handle case where blog is not found
  }

  return (
    <div>
      <Nav />
      <div className='container mx-auto h-max min-h-screen'>
        <Helmet>
          <title>{noteTitle}</title>
        </Helmet>
        <div className='flex mx-auto items-center justify-between gap-x-2 sticky top-0 my-6 py-6 backdrop-blur-sm'>
          <Link onClick={() => navigate(-1)} className='text-lg font-semibold px-3 py-1 border-[2px] border-black rounded-2xl flex items-center gap-x-2'>
            <ArrowLeft /> Back
          </Link>
          <div className='flex items-center'>
            {/* <h1 className='text-xs font-light text-muted-foreground '>{formatCreatedAt(blog.created_at)}</h1>
            <Dot className='text-stone-500' /> */}
            <p className='text-xs font-light text-muted-foreground'>{getReadingTime(blog.note_text)} min read</p>
          </div>
        </div>
        <div className='mx-auto mb-12 gap-y-4 flex flex-col blog-detail'>
          <img src={blog.thumbnail} className='show'/>
          <h1 className='font-semibold text-4xl'>{blog.title}</h1>
          <p className='text-sm'><HtmlRenderer html={blog.note_text} /></p>
        </div>
      </div>
    </div>
  );
}

export default Detail;