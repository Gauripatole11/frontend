export const commonService = {
    bufferToBase64url(buffer) {
        const array = new Uint8Array(buffer);
        let string = '';
        for (let i = 0; i < array.length; i++) {
            string += String.fromCharCode(array[i]);
        }
        const base64 = btoa(string);
        return base64.replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    },

    base64urlToBuffer(base64url) {
        const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
        const padding = '='.repeat((4 - base64.length % 4) % 4);
        const binary = atob(base64 + padding);
        const buffer = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            buffer[i] = binary.charCodeAt(i);
        }
        return buffer.buffer;
    }
};