import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ---------------- VALIDATION SCHEMA ---------------- */

const githubSchema = z.object({
  url: z.string().min(1, "Github url is require....").url("must be a valid URL").refine((value) => {
    try {
      const parsed = new URL(value);
      const hostnameValid = parsed.hostname == "github.com" || parsed.hostname == "www.github.com";

      const pathParts = parsed.pathname.split("/").filter(Boolean);

      const isSingleProfileUser = pathParts.length == 1;
      return isSingleProfileUser && hostnameValid;

    } catch (error) {
      console.log(error);
      return false;
    }
  }, "only hihtb user profile URL allowed (e.g http://github.cin/username)")
});

/* ---------------- COMPONENT ---------------- */

function GithubComponent({ fetchProfiles }) {
  
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver:zodResolver(githubSchema)
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/profiles/scrape",{ url: data.url});
      toast.success("Profile Scraped Successfully!");
      reset();
      fetchProfiles();
    } catch (error) {
      toast.error("Scraping Failed!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
      <div className="col-md-9">
        <input
          type="text"
          className={`form-control form-control-lg shadow-sm ${
            errors.url ? "is-invalid" : ""
          }`}
          placeholder="Enter GitHub Profile URL..."
          {...register("url")}
        />

        {errors.url && (
          <div className="invalid-feedback d-block">
            {errors.url.message}
          </div>
        )}
      </div>

      <div className="col-md-3 d-grid">
        <button
          type="submit"
          className="btn btn-custom btn-lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Scraping...
            </>
          ) : (
            "Scrape Profile"
          )}
        </button>
      </div>
    </form>
  );
}

export default GithubComponent;