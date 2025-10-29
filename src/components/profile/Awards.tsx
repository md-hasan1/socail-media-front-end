/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { ScrollText } from 'lucide-react';
import { Button } from '../ui/button';
import { useAddAwardMutation, useDeleteAwardMutation, useEditAwardMutation, useGetAllAwardsQuery } from '@/redux/features/api/userApi';
import { useAppSelector } from '@/redux/hooks';
import Loading from '../ui/shared/Loading';
import { IUser } from '@/types/userDataTypes';

export interface Award {
    id?: string;
    title: string;
    givenBy?: string;
    description?: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
}

function AwardsSection({ user }: { user: Partial<IUser> }) {
    const loggedInUser = useAppSelector((state) => state?.auth?.user);
    // define all mutations
    const { data: allAwardsData, isLoading: allAwardsLoading } = useGetAllAwardsQuery(user?.id, { skip: !user?.id });
    const [ addAwardMutation, { isLoading: addAwardLoading } ] = useAddAwardMutation();
    const [ editAwardMutation, { isLoading: editAwardLoading } ] = useEditAwardMutation();
    const [ deleteAwardMutation, { isLoading: deleteAwardLoading } ] = useDeleteAwardMutation();
    // other states
    const [ honorsAndAwards, setHonorsAndAwards ] = useState<Award[]>([]);

    // Sync honorsAndAwards with the fetched data
    useEffect(() => {
        if (allAwardsData) {
            setHonorsAndAwards(allAwardsData?.data || []);
        }
    }, [ allAwardsData ]);

    const [ newAward, setNewAward ] = useState<Award>({
        title: '',
        givenBy: '',
        description: '',
    });
    const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
    const [ currentAward, setCurrentAward ] = useState<Award | null>(null);







    const handleAddAward = async () => {
        try {
            // Add a new award
            const response = await addAwardMutation(newAward);
            
            setHonorsAndAwards([ ...honorsAndAwards, response.data ]);
            setNewAward({ title: '', givenBy: '', description: '' }); // Clear the input
        } catch (error) {
           
        }
    };

    const handleEditAward = (award: Award) => {
        setCurrentAward(award);
        setNewAward({ ...award });
        setIsEditMode(true);
    };

    const handleSaveAward = async () => {
        if (isEditMode && currentAward) {
            try {
                // Update the award
                const response = await editAwardMutation({ id: currentAward.id, title: newAward.title, description: newAward.description, givenBy: newAward.givenBy });
          
                setHonorsAndAwards(
                    honorsAndAwards.map(award =>
                        award.id === currentAward.id ? response.data : award
                    )
                );
                // Reset form and exit edit mode
                setIsEditMode(false);
                setCurrentAward(null);
                setNewAward({ title: '', givenBy: '', description: '' });
            } catch (error) {
                
            }
        } else {
            handleAddAward(); // Add the award if not in edit mode
        }
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setCurrentAward(null);
        setNewAward({ title: '', givenBy: '', description: '' });
    };

    const handleDeleteAward = async (id: string) => {
        const updatedAwards = honorsAndAwards.filter(award => award.id !== id);
         await deleteAwardMutation(id);
        setHonorsAndAwards(updatedAwards);
    };

    // Show loading spinner if awards are loading
    if (allAwardsLoading) {
        return <Loading />;
    }

    return (
        <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase flex items-center gap-2">
                <ScrollText />
                Honors & Awards
            </h2>
            <div className="space-y-2 pl-6">
                {/* Add or Edit Mode */}
                {isEditMode ? (
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="award-title" className="block text-sm font-medium text-gray-700">
                                Award Title
                            </label>
                            <input
                                id="award-title"
                                type="text"
                                value={newAward.title}
                                required
                                onChange={(e) => setNewAward({ ...newAward, title: e.target.value })}
                                className="text-sm p-2 w-full border rounded-md"
                                placeholder="Award Title"
                            />
                        </div>
                        <div>
                            <label htmlFor="given-by" className="block text-sm font-medium text-gray-700">
                                Given By
                            </label>
                            <input
                                id="given-by"
                                type="text"
                                required
                                value={newAward.givenBy}
                                onChange={(e) => setNewAward({ ...newAward, givenBy: e.target.value })}
                                className="text-sm p-2 w-full border rounded-md"
                                placeholder="Given By"
                            />
                        </div>
                        <div>
                            <label htmlFor="award-description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="award-description"
                                value={newAward.description}
                                required
                                onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
                                className="text-sm p-2 w-full border rounded-md"
                                placeholder="Description"
                            />
                        </div>
                        <div className="flex gap-4">
                            <Button onClick={handleSaveAward} loading={editAwardLoading || addAwardLoading} disabled={addAwardLoading || editAwardLoading || deleteAwardLoading} className="py-2 px-4 text-sm font-medium rounded bg-primary text-white">
                                Save Award
                            </Button>
                            <Button onClick={handleCancelEdit} className="py-2 px-4 text-sm font-medium rounded bg-primary text-white">
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {honorsAndAwards.length > 0 ? honorsAndAwards.map((award) => {
                            return (
                                <li key={award?.id} className="text-sm text-muted-foreground">
                                    <h3 className="font-semibold">{award.title}</h3>
                                    <p>{award.givenBy}</p>
                                    <p>{award.description}</p>
                                    <div className="flex gap-2">
                                        {loggedInUser?.id === user?.id && (
                                            <>
                                                <Button
                                                    disabled={addAwardLoading || editAwardLoading || deleteAwardLoading}
                                                    onClick={() => handleEditAward(award)}
                                                    size="sm"
                                                    className="py-1 px-3 text-xs font-medium rounded bg-warning bg-primary my-3 text-white"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    disabled={addAwardLoading || editAwardLoading || deleteAwardLoading}
                                                    onClick={() => handleDeleteAward(award.id as string)}
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
                            <div className='font-bold text-xl'>No Honors & Awards</div>
                        )}
                    </ul>
                )}

                {/* Add New Award Button */}
                {!isEditMode && loggedInUser?.id === user?.id && (
                    <div className="flex justify-end mt-4">
                        <Button
                            loading={addAwardLoading}
                            size={"sm"}
                            disabled={addAwardLoading}
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

export default AwardsSection;
