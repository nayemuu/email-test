"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import MultiSelectOptonItems from "@/components/main/reuseable/Selects/MultiSelectOpton/MultiSelectOpton";
import { Icon } from "@iconify/react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useGetTagsQuery } from "@/redux/features/tags/tagsApi";
import {
  useupdateBlogMutation,
  useUpdateBlogMutation,
} from "@/redux/features/blogs/blogsApi";
import { toast } from "sonner";
import LoaderInsideButton from "@/components/main/reuseable/Loader/LoaderInsideButton";
import { useRouter } from "next/navigation";

import "@/components/main/pages/CreateArticle/CreateArticleForm/CreateArticleForm.css";
import ImageUpload from "../CreateArticle/CreateArticleForm/ImageUpload";

// ------------------------
// 1. Custom font sizes
// ------------------------
const Size = Quill.import("attributors/style/size");
const sizeOptions = [
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "30px",
  "32px",
  "48px",
];
Size.whitelist = sizeOptions;
Quill.register(Size, true);

const modules = {
  toolbar: [
    [{ align: [] }], // align content
    ["bold", "italic", "underline"], // toggled buttons
    [{ header: [1, 2, 3, false] }],
    [{ size: sizeOptions }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }],
    [{ background: [] }], // dropdown with defaults from theme
    ["link"],
    ["blockquote"], //quotation,
    ["code-block"], // black_text_editor like cmd
  ],
}; // UIতে কি কি toolbar show করবে

const formats = [
  "align",
  "bold",
  "italic",
  "underline",
  "header",
  "size",
  "color",
  "background",
  "link",
  "list",
  "code",
  "blockquote",
  "code-block",
]; // UIএর toolbar কে ফাংশনাল করার জন্য
// string ae extra specing thakle kaj korbe na

const UpdateBlogForm = ({ blog }) => {
  const [title, setTitle] = useState("");
  const [textEditorValue, setTextEditorValue] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const tagsInputRef = useRef();
  const formRef = useRef(null);
  const quillRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // console.log("blog = ", blog);
    setTitle(blog.title);
    setTextEditorValue(blog.content);
    setCoverImage(blog.thumbnail);
    let temp = blog.tags.map((tag) => {
      //   console.log("tag id = ", tag.id);
      return tag.id;
    });

    // console.log("temp = ", temp);
    setSelectedTags(temp);
  }, []);

  const clearState = () => {
    setTitle("");
    setTextEditorValue("");
    setCoverImage("");
    setShowTagsDropdown(false);
    setSelectedTags([]);
  };

  const {
    isLoading: tagsIsLoading,
    isError: tagsIsError,
    isSuccess: tagsIsSuccess,
    data: tagsData,
    error: tagsError,
  } = useGetTagsQuery();

  const [updateBlog, { isLoading, isError, isSuccess, data, error }] =
    useUpdateBlogMutation();

  const textEditorInputHandler = (content, delta, source, editor) => {
    setTextEditorValue(content);
  };

  useOutsideClick(tagsInputRef, () => setShowTagsDropdown(false));

  const focusEditor = () => {
    if (quillRef.current) {
      quillRef.current.focus(); // focus editor programmatically
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/profile");
      }, 2500);
      clearState();
      toast.success("Blog has been updated successfully.");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      // console.log("error = ", error);
      if (error?.data?.message) {
        toast.error(error.data.message);
        // toast.success(error.data.message);
      } else {
        toast.error("Somethimg went wrong");
      }
    }
  }, [isError]);

  useEffect(() => {
    const formElement = formRef.current;

    if (!formElement) return;

    // Attach a keydown listener to the form
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && e.target.tagName === "INPUT") {
        e.preventDefault(); // block form submit on Enter key
      }
    };

    formElement.addEventListener("keydown", handleKeyDown);

    return () => {
      formElement.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title?.trim()) {
      alert("Title is required");
      return;
    }

    if (!textEditorValue?.trim()) {
      alert("Content is required");
      return;
    }

    if (!coverImage) {
      alert("Cover Image is required");
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("tags", JSON.stringify(selectedTags)); // send as array
    formData.append("content", textEditorValue.trim());
    formData.append("thumbnail", coverImage); // file or base64

    updateBlog({ id: blog.id, formData: formData }); // send validated data
  };

  let selectedTagsTitle = "Select Tag";
  if (selectedTags?.length && tagsData?.data?.length) {
    selectedTags.map((itemId, index) => {
      tagsData.data.map((tag) => {
        if (itemId === tag.id) {
          if (index !== 0) {
            selectedTagsTitle = `${selectedTagsTitle}, ${tag.title}`;
          } else {
            selectedTagsTitle = tag.title;
          }
        }
      });
    });
  } else {
    selectedTagsTitle = "Select Tag";
  }

  return (
    <form
      className="flex flex-col gap-[30px]"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="email" className="text-[20px]">
          Title <span className="text-brand-primary">*</span>
        </Label>
        <Input
          type="text"
          placeholder="Article title.."
          className="h-[50px]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="grid w-full items-center gap-3">
        <Label htmlFor="email" className="text-[20px]">
          Tag
          {/* <span className="text-brand-primary">*</span> */}
        </Label>
        <div ref={tagsInputRef}>
          <div className="relative">
            <Input
              type="text"
              placeholder="tags.."
              className="h-[50px] cursor-pointer mr-3"
              readOnly
              value={selectedTagsTitle}
              onClick={() => setShowTagsDropdown(!showTagsDropdown)}
            />

            <div className="absolute h-full flex items-center top-0 right-1 text-[12px] pointer-events-none">
              <Icon icon="formkit:down" />
            </div>
          </div>
          {showTagsDropdown && tagsIsSuccess && tagsData?.data?.length ? (
            <div className="rounded-md bg-popover shadow-md border flex flex-col gap-3 p-3 mt-3">
              {tagsData.data.map((item) => (
                <MultiSelectOptonItems
                  key={item.id}
                  item={item}
                  list={tagsData.data}
                  selectedItems={selectedTags}
                  setSelectedItems={setSelectedTags}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-[20px] mb-3">
          Content <span className="text-brand-primary">*</span>
        </Label>
        <div onClick={focusEditor}>
          <ReactQuill
            theme="snow"
            value={textEditorValue}
            onChange={textEditorInputHandler}
            placeholder="Write your article here..."
            modules={modules}
            formats={formats}
            ref={quillRef}
          />
        </div>
      </div>

      <ImageUpload
        image={coverImage}
        setImage={setCoverImage}
        title="Cover Image"
      />

      <Button className="max-w-[200px] h-[40px] text-[20px]" type="submit">
        {isLoading ? <LoaderInsideButton /> : <></>} Submit
      </Button>
    </form>
  );
};

export default UpdateBlogForm;
