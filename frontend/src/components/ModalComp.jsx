import React from 'react';

const ModalComp = () => {
    return (
        <>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className="p-3 border">
                            <form action="">
                                <input type="text" placeholder='username' name='username' className='form-control mb-3'/>
                                <input type="text" placeholder='name' name="name" className='form-control mb-3'/>
                                <input type="number" placeholder='followers' name= "followers" className='form-control mb-3'/>
                                <input type="text"placeholder='following' name=  "following" className='form-control mb-3'/>
                                <input type="text" placeholder='Bio' name="bio" className='form-control mb-3'/>
                                <button className='btn btn-sm btn-outline-success'  type='submit'>update</button>
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