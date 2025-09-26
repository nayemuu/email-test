import CreateArticleForm from "@/components/main/pages/CreateArticle/CreateArticleForm/CreateArticleForm";
import ProtectedRoute from "@/components/main/reuseable/ProtectedRoute/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
      <div className="container">
        <CreateArticleForm />
      </div>
    </ProtectedRoute>
  );
};

export default page;
