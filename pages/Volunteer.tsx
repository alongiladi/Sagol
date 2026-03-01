import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle } from 'lucide-react';
import { submitToGoogleSheets } from '../services/googleSheets';

interface VolunteerFormInputs {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    area: string;
    city: string;
    contactPreference: string;
    mobility: string;
    volunteering: string;
    additionalInfo: string;
}

export const Volunteer: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<VolunteerFormInputs>();
    const { content, language } = useLanguage();

    const onSubmit = async (data: VolunteerFormInputs) => {
        try {
            console.log(data);
            await submitToGoogleSheets('Volunteer', data);
            setIsSubmitted(true);
            reset();
        } catch (e) {
            console.error(e);
            alert('שגיאה בשליחת הטופס. אנא נסו שוב.');
        }
    };

    // Shared Styles matching Contact.tsx
    const inputClasses = (hasError: boolean) => `
    w-full bg-purple-950/50 border rounded-xl p-4 text-white transition-all 
    placeholder-purple-700/50 focus:outline-none focus:ring-1 
    ${hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-purple-700 focus:border-cyan-400 focus:ring-cyan-400'}
  `;

    const labelClasses = "block text-purple-200 text-lg font-medium mb-2";
    const radioLabelClasses = "flex items-center gap-3 text-purple-100 cursor-pointer hover:text-white transition-colors";
    const radioInputClasses = "w-5 h-5 accent-cyan-400 bg-gray-800 border-purple-500/30 focus:ring-cyan-400 focus:ring-2";

    return (
        <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-20 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{content.volunteerPage.title}</h1>
                            <h2 className="text-2xl text-purple-300 mb-4">{content.volunteerPage.subtitle}</h2>
                            <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                                {content.volunteerPage.description}
                            </p>
                        </motion.div>
                    </div>

                    <Card className="p-4 md:p-8 lg:p-10 bg-gradient-to-br from-purple-900/50 to-purple-950/80 border-purple-500/30 backdrop-blur-md shadow-2xl">
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-10"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle className="w-10 h-10 text-green-400" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">{content.forms.success.volunteerTitle}</h3>
                                <p className="text-xl text-purple-200">{content.forms.success.volunteerText}</p>
                                <Button variant="secondary" className="mt-8" onClick={() => setIsSubmitted(false)}>
                                    {content.forms.buttons.sendAnotherVolunteer}
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className={labelClasses}>{content.forms.labels.email} <span className="text-purple-400">*</span></label>
                                    <input
                                        id="email"
                                        type="email"
                                        dir="ltr"
                                        {...register("email", {
                                            required: content.forms.validation.required,
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: content.forms.validation.emailInvalid
                                            }
                                        })}
                                        className={`${inputClasses(!!errors.email)} ${language === 'he' ? 'text-right' : 'text-left'}`}
                                        placeholder={content.forms.placeholders.email}
                                    />
                                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                                </div>

                                {/* Name Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className={labelClasses}>{content.forms.labels.firstName} <span className="text-purple-400">*</span></label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            {...register("firstName", { required: content.forms.validation.required })}
                                            className={inputClasses(!!errors.firstName)}
                                        />
                                        {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className={labelClasses}>{content.forms.labels.lastName} <span className="text-purple-400">*</span></label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            {...register("lastName", { required: content.forms.validation.required })}
                                            className={inputClasses(!!errors.lastName)}
                                        />
                                        {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className={labelClasses}>{content.forms.labels.phone} <span className="text-purple-400">*</span></label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        dir="ltr"
                                        {...register("phone", {
                                            required: content.forms.validation.required,
                                            pattern: {
                                                value: /^[0-9-+() ]{9,}$/,
                                                message: content.forms.validation.phoneInvalid
                                            }
                                        })}
                                        className={`${inputClasses(!!errors.phone)} ${language === 'he' ? 'text-right' : 'text-left'}`}
                                        placeholder={content.forms.placeholders.phone}
                                    />
                                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                                </div>

                                {/* Area & City Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-purple-200 text-lg font-medium mb-3">{content.forms.labels.area} <span className="text-purple-400">*</span></label>
                                        <div className="space-y-2 bg-purple-950/30 p-4 rounded-xl border border-purple-800/50">
                                            {content.forms.options.areas.map((val) => (
                                                <label key={val} className={radioLabelClasses}>
                                                    <input
                                                        type="radio"
                                                        value={val}
                                                        {...register("area", { required: content.forms.validation.required })}
                                                        className={radioInputClasses}
                                                    />
                                                    <span>{val}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.area && <p className="text-red-400 text-sm mt-1">{errors.area.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="city" className={labelClasses}>{content.forms.labels.city} <span className="text-purple-400">*</span></label>
                                        <input
                                            id="city"
                                            type="text"
                                            {...register("city", { required: content.forms.validation.required })}
                                            className={inputClasses(!!errors.city)}
                                        />
                                        {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
                                    </div>
                                </div>

                                {/* Contact Preference */}
                                <div>
                                    <label className="block text-purple-200 text-lg font-medium mb-3">{content.forms.labels.communicationMethod} <span className="text-purple-400">*</span></label>
                                    <div className="space-y-2 bg-purple-950/30 p-4 rounded-xl border border-purple-800/50">
                                        {content.forms.options.communicationMethods.map((val) => (
                                            <label key={val} className={radioLabelClasses}>
                                                <input
                                                    type="radio"
                                                    value={val}
                                                    {...register("contactPreference", { required: content.forms.validation.required })}
                                                    className={radioInputClasses}
                                                />
                                                <span>{val}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.contactPreference && <p className="text-red-400 text-sm mt-1">{errors.contactPreference.message}</p>}
                                </div>

                                {/* Mobility */}
                                <div>
                                    <label className="block text-purple-200 text-lg font-medium mb-3">{content.forms.labels.mobility} <span className="text-purple-400">*</span></label>
                                    <div className="space-y-2 bg-purple-950/30 p-4 rounded-xl border border-purple-800/50">
                                        {content.forms.options.mobility.map((val) => (
                                            <label key={val} className={radioLabelClasses}>
                                                <input
                                                    type="radio"
                                                    value={val}
                                                    {...register("mobility", { required: content.forms.validation.required })}
                                                    className={radioInputClasses}
                                                />
                                                <span>{val}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.mobility && <p className="text-red-400 text-sm mt-1">{errors.mobility.message}</p>}
                                </div>

                                {/* Volunteering Area */}
                                <div>
                                    <label className="block text-purple-200 text-lg font-medium mb-3">{content.forms.labels.volunteeringArea} <span className="text-purple-400">*</span></label>
                                    <div className="space-y-2 bg-purple-950/30 p-4 rounded-xl border border-purple-800/50">
                                        {content.forms.options.volunteering.map((val) => (
                                            <label key={val} className={radioLabelClasses}>
                                                <input
                                                    type="radio"
                                                    value={val}
                                                    {...register("volunteering", { required: content.forms.validation.required })}
                                                    className={radioInputClasses}
                                                />
                                                <span>{val}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.volunteering && <p className="text-red-400 text-sm mt-1">{errors.volunteering.message}</p>}
                                </div>

                                {/* Additional Info */}
                                <div>
                                    <label htmlFor="additionalInfo" className={labelClasses}>{content.forms.labels.additionalInfo}</label>
                                    <textarea
                                        id="additionalInfo"
                                        rows={4}
                                        {...register("additionalInfo")}
                                        className={`${inputClasses(false)} resize-none`}
                                        placeholder={content.forms.placeholders.moreInfo}
                                    />
                                </div>

                                {/* Submit */}
                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={isSubmitting}
                                        className="w-full md:w-auto px-12 py-4 text-lg shadow-lg shadow-purple-900/20"
                                    >
                                        {isSubmitting ? content.forms.buttons.sendingVolunteer : content.forms.buttons.submitVolunteer}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};