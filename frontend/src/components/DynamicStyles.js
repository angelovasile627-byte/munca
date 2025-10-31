import React from 'react';
import { useBuilder } from '../context/BuilderContext';

const DynamicStyles = () => {
  const { siteStyles } = useBuilder();

  // Generate CSS based on site styles
  const generateCSS = () => {
    const { colors, fonts, options, customCSS } = siteStyles;

    let css = `
      /* Primary Color */
      :root {
        --primary-color: ${colors.primary};
        --button-link-color-1: ${colors.buttonsAndLinks[0] || '#FF69B4'};
        --button-link-color-2: ${colors.buttonsAndLinks[1] || '#8B4513'};
        --button-link-color-3: ${colors.buttonsAndLinks[2] || '#8B0000'};
        --button-link-color-4: ${colors.buttonsAndLinks[3] || '#48D1CC'};
        --button-link-color-5: ${colors.buttonsAndLinks[4] || '#FFFFFF'};
      }

      /* Apply primary color to various elements */
      .canvas-block button,
      .canvas-block .btn-primary,
      .canvas-block .bg-primary {
        background-color: ${colors.primary} !important;
      }

      /* Links */
      .canvas-block a {
        color: ${colors.buttonsAndLinks[0] || '#FF69B4'};
        ${options.underlinedLinks ? 'text-decoration: underline;' : 'text-decoration: none;'}
      }

      /* Font Families and Sizes */
      .canvas-block h1,
      .canvas-block .title-1 {
        font-family: ${fonts.title1.family}, sans-serif;
        font-size: ${fonts.title1.size}rem;
      }

      .canvas-block h2,
      .canvas-block .title-2 {
        font-family: ${fonts.title2.family}, sans-serif;
        font-size: ${fonts.title2.size}rem;
      }

      .canvas-block h3,
      .canvas-block .title-3 {
        font-family: ${fonts.title3.family}, sans-serif;
        font-size: ${fonts.title3.size}rem;
      }

      .canvas-block p,
      .canvas-block .text {
        font-family: ${fonts.text.family}, sans-serif;
        font-size: ${fonts.text.size}rem;
      }

      .canvas-block nav,
      .canvas-block .menu {
        font-family: ${fonts.menu.family}, sans-serif;
        font-size: ${fonts.menu.size}rem;
      }

      /* Rounded Corners */
      ${options.roundedCorners ? `
      .canvas-block .block-content,
      .canvas-block section,
      .canvas-block .card {
        border-radius: 1rem;
      }
      ` : ''}

      /* Rounded Buttons */
      ${options.roundedButtons ? `
      .canvas-block button,
      .canvas-block .btn {
        border-radius: 9999px !important;
      }
      ` : ''}

      /* Large Buttons */
      ${options.largeButtons ? `
      .canvas-block button,
      .canvas-block .btn {
        padding: 1rem 2rem !important;
        font-size: 1.125rem !important;
      }
      ` : ''}

      /* Animation on Scroll */
      ${options.animationOnScroll ? `
      .canvas-block {
        animation: fadeInUp 0.6s ease-out;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      ` : ''}

      /* Custom CSS */
      ${customCSS}
    `;

    return css;
  };

  return (
    <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
  );
};

export default DynamicStyles;
