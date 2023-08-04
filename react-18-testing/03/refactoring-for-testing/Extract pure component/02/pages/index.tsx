import styles from '@/pages/index.module.css'

import {useState, useEffect} from 'react'

const ParagraphCount = ({count}) => {
  return <div>
    This page contains {count} paragraphs.
  </div>;
};

const ParagraphCounter = () => {
  let [paras, setP] = useState(0);
  useEffect(()=>{ 
    setP(Array.prototype.slice.call(document.querySelectorAll('p'))
        .filter(p => p.innerText.length > 0)
        .length); 
  });
  return <ParagraphCount count={paras} />;
};

export default function Home() {
  return (
    <div className={styles.container}>
      <main>
        <ParagraphCounter />
        <p>
        “This meat has surely been used for soup,” said Miss Bartlett, laying down her
        fork.
        </p>
        <p>
        “I want so to see the Arno. The rooms the Signora promised us in her letter
        would have looked over the Arno. The Signora had no business to do it at all.
        Oh, it is a shame!”
        </p>
        <p>
        “Any nook does for me,” Miss Bartlett continued; “but it does seem hard that
        you shouldn’t have a view.”
        </p>
        <p>
        Lucy felt that she had been selfish. “Charlotte, you mustn’t spoil me: of
        course, you must look over the Arno, too. I meant that. The first vacant room
        in the front—” “You must have it,” said Miss Bartlett, part of whose
        travelling expenses were paid by Lucy’s mother—a piece of generosity to
        which she made many a tactful allusion.
        </p>
        <p>
        “No, no. You must have it.”
        </p>
        <p>
        “I insist on it. Your mother would never forgive me, Lucy.”
        </p>
        <p>
        “She would never forgive <i>me</i>.”
        </p>
      </main>
    </div>
  )
}
