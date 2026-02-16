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
    const [searchTerm, setSearchTerm] = useState("");

    // Track the ID of the note the user intends to delete
    const [noteToDelete, setNoteToDelete] = useState(null);

    const userMenuRef = useRef(null);
    const user = JSON.parse(localStorage.getItem("user"));

    // Fetch notes on mount
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
                setNotes(Array.isArray(data) ? data : []);
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
            setNotes([data, ...notes]);
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
                body: JSON.stringify({ title: updatedNote.title, content: updatedNote.content }),
            });
            const data = await res.json();
            setNotes(notes.map((n) => (n._id === data._id ? data : n)));
        } catch (err) {
            console.error("Failed to update note:", err);
        }
    };


    const confirmDelete = async () => {
        if (!noteToDelete) return;

        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:5000/api/notes/${noteToDelete}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            // Update UI
            setNotes(notes.filter((n) => n._id !== noteToDelete));
            // Close Modal
            setNoteToDelete(null);
        } catch (err) {
            console.error("Failed to delete note:", err);
        }
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="h-full w-full">
            <div className="w-full h-full bg-white rounded-lg flex">
                <div className="sidebar-side w-[100px] bg-[#d9d9d9] p-4 fixed h-full flex flex-col justify-between items-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-lg font-pacifico">Notify</h1>
                        <button onClick={() => setShowAddModal(true)} className="mt-10">
                            <img src={assets.add} className="w-6 md:w-8" alt="Add" />
                        </button>
                    </div>
                </div>

                {showAddModal &&
                    <AddNotes onClose={() => setShowAddModal(false)} onSave={handleAddNote} />}
                {editNote &&
                    <EditNotes note={editNote} onClose={() => setEditNote(null)} onUpdate={handleUpdateNote} />}

                <div className="content-side w-full p-4 px-8 ml-[100px]">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center border rounded-full px-3 w-full max-w-[450px]">
                            <img src={assets.search} className="w-4" alt="Search" />
                            <input type="search" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search notes by title" className="w-full md:w-[400px] text-xs md:text-sm p-2 outline-none rounded-full" />
                        </div>
                        <button className="border rounded-full p-2 bg-black relative" ref={userMenuRef}>
                            <img src={assets.user} onClick={() => setShowUserMenu(!showUserMenu)} className="w-5 invert" alt="User" />
                        </button>
                        {showUserMenu && (
                            <div className="absolute flex flex-col justify-between right-10 mt-60 w-[200px] h-[200px] bg-white border rounded shadow-lg z-50">
                                <div className="text-center p-4 pt-8">
                                    <h1 className="font-semibold font-outfit text-2xl">Welcome {user?.firstName} !</h1>
                                    <p className="text-[10px] font-outfit pt-2">{user?.email}</p>
                                </div>
                                <div className="cta-buttons flex flex-col">
                                    <ul className="text-xs">
                                        <Link to="/">
                                            <li className="hover:bg-gray-100 p-2 border-t text-red-500">
                                                <img src={assets.logout} alt="Logout" className="w-4 inline mr-2" />
                                                <button>Logout</button>
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="notes-detail mt-6 flex gap-2    items-center">
                        <h1 className="text-4xl font-outfit font-semibold">My Notes</h1>
                        <img src={assets.note} className="w-8" alt="Note" />
                    </div>

                    {notes.length === 0 && (
                        <div className="flex items-center pt-2">
                            <h1 className="text-gray-400 text-sm">No Notes Available. Add now</h1>
                        </div>
                    )}

                    <div className="notes mt-4 flex flex-wrap gap-4">
                        {filteredNotes.map((note) => (
                            <div key={note._id} className="note flex flex-col justify-between border border-gray-300 w-[280px] h-[250px] p-4 bg-white shadow-md rounded-lg">
                                <h1 className="text-lg font-semibold border-b pb-2">{note.title}</h1>
                                <div className="text-sm h-[180px] overflow-y-auto pt-2" dangerouslySetInnerHTML={{ __html: note.content }} />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={() => setEditNote(note)} className="bg-blue-500 p-2 px-3 flex text-xs items-center gap-2 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                                        <img className="w-4 invert" src={assets.edit} alt="Edit" />
                                        
                                    </button>

                                    <button onClick={() => setNoteToDelete(note._id)} className="bg-red-500 p-2 gap-1 flex text-xs text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                                        <img className="w-5 invert" src={assets.trash} alt="Delete" />
                                        
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {noteToDelete && (
                <div className="deletePopUp flex justify-center items-center fixed inset-0 bg-black/40 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <h1 className="text-lg font-semibold">Delete Note?</h1>
                        <p className="text-gray-500 text-sm mt-2">Are you sure you want to delete this note? This action cannot be undone.</p>
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setNoteToDelete(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-xs font-medium hover:bg-gray-300 transition-colors">
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-md text-xs font-medium hover:bg-red-600 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;