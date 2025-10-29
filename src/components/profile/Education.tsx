
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect } from 'react';
import { ScrollText } from 'lucide-react';
import { Button } from '../ui/button';
import { useAddEducationMutation, useDeleteEducationMutation, useEditEducationMutation, useGetAllEducationsQuery } from '@/redux/features/api/userApi';
import { useAppSelector } from '@/redux/hooks';
import Loading from '../ui/shared/Loading';
import { IUser } from '@/types/userDataTypes';

interface Education {
    id?: string;
    instituteName: string;
    department: string;
    session: string;
    description: string;
}

function EducationSection({ user }: { user: Partial<IUser> }) {
    const loggedInUser = useAppSelector((state) => state?.auth?.user);

    // Define mutations
    const { data: allEducationData, isLoading: allEducationLoading } = useGetAllEducationsQuery(user?.id, { skip: !user?.id });
    const [ addEducationMutation, { isLoading: addEducationLoading } ] = useAddEducationMutation();
    const [ editEducationMutation, { isLoading: editEducationLoading } ] = useEditEducationMutation();
    const [ deleteEducationMutation, { isLoading: deleteEducationLoading } ] = useDeleteEducationMutation();

    const [ education, setEducation ] = useState<Education[]>([]);
    const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
    const [ currentEducation, setCurrentEducation ] = useState<Education | null>(null);
    const [ newEducation, setNewEducation ] = useState<Education>({
        instituteName: '',
        department: '',
        session: '',
        description: ''
    });


    // Sync education state with fetched data
    useEffect(() => {
        if (allEducationData) {
            setEducation(allEducationData?.data || []);
        }
    }, [ allEducationData ]);

    // Handle adding education
    const handleAddEducation = async () => {
        try {
            const response = await addEducationMutation(newEducation);
            setEducation([ ...education, response.data ]);
            setNewEducation({ id: '', instituteName: '', department: '', session: '', description: '' }); // Clear form
        } catch (error) {
        
        }
    };

    // Handle editing education
    const handleEditEducation = (edu: Education) => {
        setCurrentEducation(edu);
        setNewEducation({ ...edu });
        setIsEditMode(true);
    };

    // Save edited education
    const handleSaveEducation = async () => {
        if (isEditMode && currentEducation) {
            try {
                const response = await editEducationMutation({
                    id: currentEducation.id,
                    instituteName: newEducation.instituteName,
                    department: newEducation.department,
                    session: newEducation.session,
                    description: newEducation.description,
                });
                setEducation(
                    education.map(edu => edu.id === currentEducation.id ? response.data : edu)
                );
                setIsEditMode(false);
                setCurrentEducation(null);
                setNewEducation({ id: '', instituteName: '', department: '', session: '', description: '' });
            } catch (error) {
               
            }
        } else {
            handleAddEducation();
        }
    };

    // Cancel edit or add mode
    const handleCancelEdit = () => {
        setIsEditMode(false);
        setCurrentEducation(null);
        setNewEducation({ id: '', instituteName: '', department: '', session: '', description: '' });
    };

    // Delete education entry
    const handleDeleteEducation = async (id: string) => {
        try {
            await deleteEducationMutation(id);
            setEducation(education.filter(edu => edu.id !== id));
        } catch (error) {
                
        }
    };

    // Show loading spinner if education is loading
    if (allEducationLoading) {
        return <Loading />;
    }

    return (
        <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase flex items-center gap-2">
                <ScrollText />
                Education
            </h2>
            <div className="space-y-2 pl-6">
                {/* Add or Edit Education */}
                {isEditMode ? (
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="institute-name" className="block text-sm font-medium text-gray-700">
                                Institute Name
                            </label>
                            <input
                                id="institute-name"
                                type="text"
                                value={newEducation.instituteName}
                                required
                                onChange={(e) => setNewEducation({ ...newEducation, instituteName: e.target.value })}
                                className="text-sm p-2 w-full border rounded-md"
                                placeholder="Institute Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                Department
                            </label>
                            <input
                                id="department"
                                type="text"
                                value={newEducation.department}
                                required
                                onChange={(e) => setNewEducation({ ...newEducation, department: e.target.value })}
                                className="text-sm p-2 w-full border rounded-md"
                                placeholder="Department"
                            />
                        </div>
                        <div>
                            <label htmlFor="session" className="block text-sm font-medium text-gray-700">
                                Session
                            </label>
                            <input
                                id="session"
                                type="text"
                                value={newEducation.session}
                                required
                                onChange={(e) => setNewEducation({ ...newEducation, session: e.target.value })}
                                className="text-sm p-2 w-full border rounded-md"
                                placeholder="Session"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={newEducation.description}
                                required
                                onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                                className="text-sm p-2 w-full border rounded-md"
                                placeholder="Description"
                            />
                        </div>
                        <div className="flex gap-4">
                            <Button
                                onClick={handleSaveEducation}
                                loading={addEducationLoading || editEducationLoading}
                                disabled={addEducationLoading || editEducationLoading || deleteEducationLoading}
                                className="py-2 px-4 text-sm font-medium rounded bg-primary text-white"
                            >
                                Save Education
                            </Button>
                            <Button
                                onClick={handleCancelEdit}
                                className="py-2 px-4 text-sm font-medium rounded bg-primary text-white"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {education.length > 0 ? education.map((edu) => {
                            return (
                                <li key={edu.id} className="text-sm text-muted-foreground">
                                    <h3 className="font-semibold">{edu.instituteName}</h3>
                                    <p>{edu.department}</p>
                                    <p>{edu.session}</p>
                                    <p>{edu.description}</p>
                                    <div className="flex gap-2">
                                        {loggedInUser?.id === user?.id && (
                                            <>
                                                <Button
                                                    disabled={addEducationLoading || editEducationLoading || deleteEducationLoading}
                                                    onClick={() => handleEditEducation(edu)}
                                                    size="sm"
                                                    className="py-1 px-3 text-xs font-medium rounded bg-warning bg-primary my-3 text-white"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    disabled={addEducationLoading || editEducationLoading || deleteEducationLoading}
                                                    onClick={() => handleDeleteEducation(edu.id as string)}
                                                    size="sm"
                                                    className="py-1 px-3 text-xs font-medium rounded bg-danger bg-primary my-3 text-white"
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </li>
                            );
                        }) : (
                            <div className="font-bold text-xl">No Education Added</div>
                        )}
                    </ul>
                )}

                {/* Add New Education Button */}
                {!isEditMode && loggedInUser?.id === user?.id && (
                    <div className="flex justify-end mt-4">
                        <Button
                            loading={addEducationLoading}
                            size="sm"
                            disabled={addEducationLoading}
                            onClick={() => setIsEditMode(true)}
                            className="py-2 px-4 text-sm font-medium rounded bg-primary text-white"
                        >
                            Add
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default EducationSection;
