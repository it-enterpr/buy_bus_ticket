import React from 'react';

// Jednoduché SVG vlajky, abychom nepotřebovali externí obrázky
const CZFlag = () => <svg width="28" height="20" viewBox="0 0 3 2" className="rounded-sm"><path fill="#fff" d="M0 0h3v2H0z" /><path fill="#d7141a" d="M0 1h3v1H0z" /><path fill="#11457e" d="m0 0 1.5 1L0 2z" /></svg>;
const USFlag = () => <svg width="28" height="20" viewBox="0 0 7410 3900" className="rounded-sm"><path fill="#b22234" d="M0 0h7410v3900H0z" /><path stroke="#fff" strokeWidth="300" d="M0 450h7410M0 1050h7410M0 1650h7410M0 2250h7410M0 2850h7410M0 3450h7410" /><path fill="#3c3b6e" d="M0 0h2964v2100H0z" /><g fill="#fff"><g id="d"><g id="c"><g id="b"><path id="a" d="m148 0-46 142-150-13-104 118 22 148-132 78 78 132-148 22 118 104-13-150 142 46 81-142 81 142 142-46-13 150 118-104-148-22 78-132-132-78 22-148-104-118-150 13z" /><use href="#a" transform="scale(-1 1)" /></g><use href="#b" transform="rotate(72)" /></g><use href="#c" transform="rotate(72)" /></g><use href="#d" transform="translate(592.8)" /><use href="#d" transform="translate(1185.6)" /><use href="#d" transform="translate(1778.4)" /><use href="#d" transform="translate(2371.2)" /></g><g transform="translate(296.4 210)"><use href="#d" /><use href="#d" transform="translate(592.8)" /><use href="#d" transform="translate(1185.6)" /><use href="#d" transform="translate(1778.4)" /></g><g transform="translate(0 420)"><use href="#d" transform="translate(0 420)" /><use href="#d" transform="translate(592.8 420)" /><use href="#d" transform="translate(1185.6 420)" /><use href="#d" transform="translate(1778.4 420)" /><use href="#d" transform="translate(2371.2 420)" /></g><g transform="translate(296.4 630)"><use href="#d" transform="translate(0 420)" /><use href="#d" transform="translate(592.8 420)" /><use href="#d" transform="translate(1185.6 420)" /><use href="#d" transform="translate(1778.4 420)" /></g></svg>;
const UAFlag = () => <svg width="28" height="20" viewBox="0 0 3 2" className="rounded-sm"><path fill="#0057b7" d="M0 0h3v1H0z" /><path fill="#ffd700" d="M0 1h3v1H0z" /></svg>;


const LanguageSwitcher = ({ setLanguage, currentLang }) => {
    const languages = [
        { code: 'uk', flag: <UAFlag />, name: 'Українська' },
        { code: 'cs', flag: <CZFlag />, name: 'Čeština' },
        { code: 'en', flag: <USFlag />, name: 'English' },
    ];

    return (
        <div className="flex items-center space-x-2">
            {languages.map(lang => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`p-1 rounded-md transition-opacity ${currentLang === lang.code ? 'opacity-100 ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'}`}
                    title={lang.name}
                >
                    {lang.flag}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
