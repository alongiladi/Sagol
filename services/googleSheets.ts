// Replace these URLs with your deployed Google Apps Script Web App URLs
const CONTACT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzxsUG3vg-bub1zYQ7LLHAHb73XPMmM75czXlA6imJZMp96SZmD9-dUQLGzUsRT_HmW_A/exec';
const VOLUNTEER_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz2ZFaD_EWB2ETOY60IRmVH-sCZvq1zEyDhVlk73yHCmrywrGR5SGH3eQhp-CiBrcIePw/exec';

export const submitToGoogleSheets = async (formType: 'Contact' | 'Volunteer', data: any) => {
    const url = formType === 'Contact' ? CONTACT_SCRIPT_URL : VOLUNTEER_SCRIPT_URL;

    if (url.includes('YOUR_') || !url) {
        console.warn(`Google Sheets URL for ${formType} is not configured. Data:`, data);
        return { result: 'success', message: 'Simulated success (URL not configured)' };
    }

    try {
        // We use URLSearchParams to send data as 'application/x-www-form-urlencoded'
        // This is often more reliable for Google Apps Script than FormData (multipart/form-data)
        const params = new URLSearchParams();
        params.append('formType', formType);

        Object.keys(data).forEach(key => {
            const value = data[key];
            // Handle boolean or other types by converting to string
            params.append(key, String(value));
        });

        const response = await fetch(url, {
            method: 'POST',
            body: params,
            // mode: 'no-cors' is needed because GAS Web Apps don't easily support CORS preflight for custom domains
            // or simple POSTs without redirect issues.
            mode: 'no-cors'
        });

        // With no-cors, we can't check response.ok or response.json()
        // We assume if it didn't throw, it worked.
        return { result: 'success' };

    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        throw error;
    }
};
