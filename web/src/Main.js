import React, { useState, useEffect, useContext } from 'react';
import styles from './Main.module.css';

import ColorSetInputs from './ColorSetInputs';
import TextPreviews from './TextPreviews';
import WallpaperPreview from './WallpaperPreview';
import PreBuiltList from './PreBuiltList';
import Download from './Download';
import Link from './Link';
import CopyUrl from './CopyUrl';
import StarCount from './StarCount';
import ThemeContext from './ThemeContext';

export default () => {
  const [keyboarding, setKeyboarding] = useState(false);
  const onKeyDown = (evt) => {
    if (evt.key === 'Tab') {
      setKeyboarding(true);
    }
  };
  const onMouseDown = () => {
    setKeyboarding(false);
  }
  useEffect(() => {
    window.document.addEventListener('keydown', onKeyDown);
    return () => {
      window.document.removeEventListener('keydown', onKeyDown);
    };
  });
  useEffect(() => {
    window.document.addEventListener('mousedown', onMouseDown);
    return () => {
      window.document.removeEventListener('mousedown', onMouseDown);
    }
  });
  const { getActiveColorOrFallback } = useContext(ThemeContext);
  return (
    <div
      className={ `${styles.app} ${keyboarding ? styles.keyboarding : ''}` }
      style={{
        backgroundColor: getActiveColorOrFallback(['shade0'], true),
        '--selection-foreground-color': getActiveColorOrFallback(['shade0'], true),
        '--selection-background-color': getActiveColorOrFallback(['accent5']),
        '--focus-outline-color': getActiveColorOrFallback(['accent6']),
      }}
    >
      <div className={ styles.container }>
        <header className={ styles.header }>
          <h1 className={ styles.h1 } style={{ color: getActiveColorOrFallback(['shade7']) }}>themer</h1>
          <StarCount />
        </header>
        <hr
          className={ styles.hr }
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                ${getActiveColorOrFallback(['accent0', 'shade2'])},
                ${getActiveColorOrFallback(['accent1', 'shade2'])},
                ${getActiveColorOrFallback(['accent2', 'shade2'])},
                ${getActiveColorOrFallback(['accent3', 'shade2'])},
                ${getActiveColorOrFallback(['accent4', 'shade2'])},
                ${getActiveColorOrFallback(['accent4', 'shade2'])},
                ${getActiveColorOrFallback(['accent5', 'shade2'])},
                ${getActiveColorOrFallback(['accent6', 'shade2'])},
                ${getActiveColorOrFallback(['accent7', 'shade2'])}
              )
            `,
          }}
        />
        <p style={{ color: getActiveColorOrFallback(['shade6'])}}>themer takes a set of colors and generates themes for your apps (editors, terminals, wallpapers, and more).</p>
        <h2 className={ styles.h2 } style={{ color: getActiveColorOrFallback(['shade7']) }}>1. Define colors</h2>
        <p className={ styles.help } style={{ color: getActiveColorOrFallback(['shade6']) }}>Input your colors using any CSS format (keyword, hsl, rgb, etc.).</p>
        <ColorSetInputs />
        <p className={ styles.preBuilt } style={{ color: getActiveColorOrFallback(['shade6']) }}>
          Or start with a pre-built color set:
        </p>
        <PreBuiltList />
        <h2 className={ styles.h2 } style={{ color: getActiveColorOrFallback(['shade7'])}}>2. Preview</h2>
        <div className={ styles.previewsContainer }>
          <TextPreviews />
          <WallpaperPreview />
        </div>
        <h2 className={ styles.h2 } style={{ color: getActiveColorOrFallback(['shade7'])}}>3. Download</h2>
        <p className={ styles.help } style={{ color: getActiveColorOrFallback(['shade6']) }}>Select which themes you'd like to generate from your color set.</p>
        <Download />
      </div>
      <div className={ styles.shape } style={{ '--shape-color': getActiveColorOrFallback(['shade1'], true) }}>
        <div className={ styles.container }>
          <p style={{ color: getActiveColorOrFallback(['shade7']) }}>
            <span style={{ color: getActiveColorOrFallback(['accent1']) }}>Pro tip:</span>
            {' '}
            The current URL uniquely identifies your current theme. Bookmark it, email it, or share it however you like.
            <CopyUrl className={ styles.copyUrl }/>
          </p>
        </div>
      </div>
      <footer className={ styles.footer } style={{ color: getActiveColorOrFallback(['shade3']) }}>
        themer is free and open source software, made by <Link href="https://mjswensen.com">mjswensen</Link> with <Link href="https://github.com/mjswensen/themer/graphs/contributors">contributors</Link>, and is released under the MIT license
      </footer>
    </div>
  );
}
