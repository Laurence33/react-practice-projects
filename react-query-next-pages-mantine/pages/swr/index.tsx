import { useState } from 'react';
import { useApi } from '@/hooks/useApi';

type Color = {
  id: number;
  label: string;
};

function SwrPage() {
  const { data, isLoading, error, post, put, del } = useApi<Color[]>('/colors');
  const [colorVal, setColorVal] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | number>('');
  function handleSave() {
    if (isEditing) put(editId!, { label: colorVal });
    else post({ label: colorVal });
    setIsEditing(false);
    setEditId('');
    setColorVal('');
  }
  return (
    <div>
      <label htmlFor="">Color: </label>
      <input type="string" value={colorVal} onChange={(e) => setColorVal(e.target.value)} />
      <button type="button" onClick={handleSave}>
        Save
      </button>
      <ul>
        {isLoading && 'Loading...'}
        {data?.map((d: Color) => (
          <li>
            {d.label}
            <span>
              {' '}
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setEditId(d.id);
                  setColorVal(d.label);
                }}
              >
                e
              </button>{' '}
              <button type="button" onClick={() => del(d.id)}>
                x
              </button>
            </span>
          </li>
        ))}{' '}
      </ul>
    </div>
  );
}

export default SwrPage;
