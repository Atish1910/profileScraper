import React from "react";

const ModalComp = ({ selectedData }) => {
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="p-3 border">
                <form action="">
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={selectedData.username}
                    className="form-control mb-3"
                  />
                  <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={selectedData.name}
                    className="form-control mb-3"
                  />
                  <input
                    type="number"
                    placeholder="followers"
                    name="followers"
                    value={selectedData.followers}
                    className="form-control mb-3"
                  />
                  <input
                    type="text"
                    placeholder="following"
                    name="following"
                    value={selectedData.following}
                    className="form-control mb-3"
                  />
                  <input
                    type="text"
                    placeholder="Bio"
                    name="bio"
                    value={selectedData.bio}
                    className="form-control mb-3"
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
