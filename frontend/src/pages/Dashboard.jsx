import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import AddNotes from "../components/AddNotes";
import EditNotes from "../components/EditNotes";

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editNote, setEditNote] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null);
    const user = JSON.parse(localStorage.getItem("user"));


useEffect(() => {
    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/notes", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setNotes(Array.isArray(data.notes) ? data.notes : []); // ensure it's an array
        } catch (err) {
            console.error("Failed to fetch notes:", err);
            setNotes([]);
        }
    };

    fetchNotes();
}, []);



    const handleAddNote = async (note) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(note),
            });

            const data = await res.json();
            setNotes([data, ...notes]); // add new note at the top
        } catch (err) {
            console.error("Failed to add note:", err);
        }
    };


    const handleUpdateNote = async (updatedNote) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/api/notes/${updatedNote._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedNote),
            });

            const data = await res.json();
            setNotes(notes.map((n) => (n._id === data._id ? data : n)));
        } catch (err) {
            console.error("Failed to update note:", err);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:5000/api/notes/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setNotes(notes.filter((n) => n._id !== id));
        } catch (err) {
            console.error("Failed to delete note:", err);
        }
    };



    return (
        <div className="h-full w-full ">
            <div className="w-full h-full  bg-white rounded-lg flex">
                <div className="sidebar-side w-[100px] bg-[#d9d9d9] p-4 fixed h-full flex flex-col justify-between items-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-sm">Notify</h1>
                        <button onClick={() => setShowAddModal(true)} className="mt-10">
                            <img src={assets.add} className="w-6 md:w-8" alt="" />
                        </button>
                    </div>
                    <div className="cta-btn">
                        <button className="text-xs">Settings</button>
                        <button className="text-xs">Contact Us</button>
                    </div>

                </div>

                {/* Add Note Modal */}
                {showAddModal && (
                    <AddNotes
                        onClose={() => setShowAddModal(false)}
                        onSave={handleAddNote}
                    />
                )}

                {/* Edit Note Modal */}
                {editNote && (
                    <EditNotes
                        note={editNote}
                        onClose={() => setEditNote(null)}
                        onUpdate={handleUpdateNote}
                        onDelete={handleDeleteNote}
                    />
                )}

                <div className="content-side w-full p-4 px-8 ml-[100px]">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center border rounded-full px-3 w-full max-w-[450px]">
                            <img src={assets.search} className="w-4" alt="" />
                            <input
                                type="search"
                                placeholder="Search"
                                className="w-full md:w-[400px] text-xs md:text-sm p-2 outline-none rounded-full"
                            />
                        </div>
                        <button className="border rounded-full p-2 bg-black relative" ref={userMenuRef}>
                            <img src={assets.user} onClick={() => setShowUserMenu(!showUserMenu)} className="w-5 invert" alt="" />
                        </button>
                        {/* User Menu */}
                        {showUserMenu && (
                            <div className="absolute flex flex-col justify-between  right-10 mt-60 w-[200px] h-[200px] bg-white border rounded shadow-lg z-50">
                                <div className="text-center p-4 pt-8">
                                    <h1 className="font-semibold text-lg">Welcome {user.firstName} !</h1>
                                    <p className="text-xs pt-2">{user.email}</p>
                                </div>
                                <div className="cta-buttons flex flex-col">
                                    <ul className="text-xs ">
                                        <Link to="/"> <li className="hover:bg-gray-100 p-2 border-t text-red-500"><button>Logout</button></li></Link>
                                    </ul>

                                </div>
                            </div>
                        )}
                    </div>

                    <div className="notes-detail mt-6">
                        <h1 className="text-4xl font-outfit font-semibold">My Notes</h1>
                    </div>
                    {notes.length === 0 && (
                        <div className="flex  items-center pt-2">
                            <h1 className="text-gray-400 text-sm">No Notes Available. Add now</h1>
                        </div>
                    )}

                    <div className="notes mt-4 flex flex-wrap gap-4">
                        {notes.map((note) => (
                            <div key={note._id} className="note flex flex-col justify-between border w-[280px] h-[250px] p-4 bg-white shadow-md rounded-lg">
                                <div>
                                    <h1 className="text-lg font-semibold border-b">{note.title}</h1>
                                    <p className="pt-4 text-sm">{note.description}</p>
                                    <p className="pt-2 text-sm">
                                        <span className="font-bold">Deadline:</span> {note.deadline}
                                    </p>
                                </div>

                                <div className=" gap-2 w-full flex justify-end">
                                    <button onClick={() => setEditNote(note)} className="rounded-lg bg-blue-500 p-1"><img className="w-4 invert" src={assets.edit} alt="" /></button>
                                    <button onClick={() => handleDeleteNote(note.id)} className="rounded-lg bg-red-500 p-1"><img className="w-4 invert" src={assets.trash} alt="" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
