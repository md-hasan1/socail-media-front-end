/* eslint-disable @typescript-eslint/no-explicit-any */


/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Calendar, Mail, MapPin, Phone, ScrollText } from 'lucide-react'
import { setIsBioEditMode } from '@/redux/features/slices/authSlice'
import { IUser } from '@/types/userDataTypes'
import EducationSection from './Education'
import AwardsSection from './Awards'
import { Button } from '../ui/button'
import { useUpdateUserInfoMutation } from '@/redux/features/api/userApi'

function BioContent({ user }: { user: Partial<IUser> }) {
    const [ updateUserInfoMutation, { isLoading: updateUserInfoLoading } ] = useUpdateUserInfoMutation();
    const [ summary, setSummary ] = useState(user?.summary || "");
    const [ phone, setPhone ] = useState(user?.phone || "");
    const [ location, setLocation ] = useState(user?.address || "");
    const [ birthday, setBirthday ] = useState(user?.birthday || "");
    const [ skills, setSkills ] = useState(user?.skills?.join(", ") || "");

    const IsBioEditMode = useAppSelector((state) => state.auth.isBioEditMode);
    const loggedInUser = useAppSelector((state) => state.auth.user);

    const dispatch = useAppDispatch();

    // Handle save updates for editable fields only
    const handleSaveUpdate = async () => {
        // Split skills into an array
        const skillsArray = skills.split(",").map((skill: any) => skill.trim()).filter(Boolean);

        const updatedUserBio = {
            summary,
            phone,
            address: location,
            birthday,
            skills: skillsArray,  // Pass the skills array here
        };

   

        try {
            await updateUserInfoMutation(updatedUserBio).unwrap(); // Update user info via API call
            dispatch(setIsBioEditMode()); // Exit edit mode after update
        } catch (error) {
            console.error("Failed to update user info:", error);
        }
    };

    // Toggle edit mode for non-education/award sections
    const handleEditToggle = () => {
        dispatch(setIsBioEditMode());
    };

    // Phone validation: Ensure it’s a valid phone number
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Regex to match only numbers and optional spaces or dashes
        if (/^[0-9\s\-]*$/.test(value)) {
            setPhone(value);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-3xl p-6 space-y-8">
                {/* Edit Button */}

                {
                    user?.id === loggedInUser?.id &&
                    <Button
                        onClick={handleEditToggle}
                        className="py-2 px-4 text-sm font-medium rounded bg-primary text-white"
                    >
                        {IsBioEditMode ? 'Cancel Edit' : 'Edit Bio'}
                    </Button>
                }
                {/* Summary Section */}
                <section className="space-y-2">
                    <h2 className="text-sm font-semibold uppercase flex items-center gap-2">
                        <ScrollText />
                        Summary
                    </h2>
                    {IsBioEditMode ? (
                        <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="text-sm text-muted-foreground leading-relaxed pl-6 w-full h-32 border p-2 rounded-md"
                        />
                    ) : (
                        <p className="text-sm text-muted-foreground leading-relaxed pl-6">{summary}</p>
                    )}
                </section>

                <hr />

                {/* Contact Info Section */}
                <section className="space-y-2">
                    <h2 className="text-sm font-semibold uppercase flex items-center gap-2">
                        <ScrollText />
                        Contact Info
                    </h2>
                    <div className="space-y-2 pl-6">
                        {IsBioEditMode ? (
                            <>
                                <label htmlFor="phone" className="text-sm font-semibold">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    className="text-sm p-2 w-full border rounded-md"
                                    placeholder="Phone"
                                />
                                <label htmlFor="location" className="text-sm font-semibold">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="text-sm p-2 w-full border rounded-md"
                                    placeholder="Location"
                                />
                            </>
                        ) : (
                            <>
                                <p className="text-sm flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    {phone}
                                </p>
                                <p className="text-sm flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    {location}
                                </p>
                            </>
                        )}
                    </div>
                </section>

                <hr />

                {/* Birthday Section */}
                <section className="space-y-2">
                    <h2 className="text-sm font-semibold uppercase flex items-center gap-2">
                        <ScrollText />
                        Birthday
                    </h2>
                    {IsBioEditMode ? (
                        <input
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            className="text-sm p-2 w-full border rounded-md"
                        />
                    ) : (
                        <p className="text-sm text-muted-foreground pl-6">
                            <Calendar className="h-4 w-4 inline mr-2" />
                            {birthday}
                        </p>
                    )}
                </section>

                <hr />

                {/* Skills Section */}
                <section className="space-y-2">
                    <h2 className="text-sm font-semibold uppercase flex items-center gap-2">
                        <ScrollText />
                        Skills
                    </h2>
                    {IsBioEditMode ? (
                        <>
                            <label htmlFor="skills" className="text-sm font-semibold">Skills (comma separated)</label>
                            <input
                                type="text"
                                id="skills"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                className="text-sm p-2 w-full border rounded-md"
                                placeholder="JavaScript, Node.js, React, etc."
                            />
                        </>
                    ) : (
                        <ul className="text-sm text-muted-foreground pl-6">
                            {skills.split(',').map((skill, index) => (
                                <li key={index}>• {skill.trim()}</li>
                            ))}
                        </ul>
                    )}
                </section>

                {/* Save Button */}
                {IsBioEditMode && (
                    <div className="flex justify-end">
                        <Button onClick={handleSaveUpdate} className="py-2 px-4 text-sm font-medium rounded bg-primary text-white" disabled={updateUserInfoLoading}>
                            {updateUserInfoLoading ? 'Saving...' : 'Save Bio Updates'}
                        </Button>
                    </div>
                )}

                <hr />

                {/* Awards Section (No Edit Here, Just Data Passed) */}
                <AwardsSection user={user} />

                <hr />

                {/* Education Section (No Edit Here, Just Data Passed) */}
                <EducationSection user={user} />

                <hr />
            </div>
        </div>
    );
}

export default BioContent;
