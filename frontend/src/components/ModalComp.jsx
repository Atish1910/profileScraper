import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const ModalComp = ({ selectedData , handleUpdateProfile}) => {

  const {
    register, 
    handleSubmit, 
    reset,
    
  } = useForm();

  useEffect(() => {
    if(selectedData){
      reset({
        username : selectedData.username || "",
        name : selectedData.name || "",
        followers : selectedData.followers || 0,
        following : selectedData.following || 0,
        bio : selectedData.bio || ""
      })
    }
  }, [selectedData, reset]);

  const onSubmit = (data) => {
    console.log(data);
    handleUpdateProfile(selectedData._id, data);
    reset();
  }

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update profile</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="p-3 border">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="">Enter Your Username name</label>
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    className="form-control mb-3"
                    {...register("username")}
                  />
                  <label htmlFor="">Enter Your name</label>
                  <input
                    type="text"
                    placeholder="name"
                    name="name"
                    className="form-control mb-3"
                    {...register("name")}
                  />
                  <label htmlFor="">Enter Your followers</label>
                  <input
                    type="number"
                    placeholder="followers"
                    name="followers"
                    className="form-control mb-3"
                    {...register("followers")}
                  />
                  <label htmlFor="">Enter Your Following</label>
                  <input
                    type="text"
                    placeholder="following"
                    name="following"
                    className="form-control mb-3"
                    {...register("following")}
                  />
                  <label htmlFor="">Enter Your bio</label>
                  <input
                    type="text"
                    placeholder="Bio"
                    name="bio"
                    className="form-control mb-3"
                    {...register("bio")}
                  />
                  <button
                    className="btn btn-sm btn-outline-success"
                    type="submit"
                  >
                    update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComp;
