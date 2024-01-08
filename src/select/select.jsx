import { useState, useRef, useEffect, useId } from 'react';
import { TextInput } from '../UI';
import './select.css';

export const MultiSelect = (props) => {
  const [dropdown, setDropdown] = useState('');
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState(props.items);

  const element = useRef();
  const parentElement = useRef();
  const id = useId();

  const textChanged = (event) => {
    setDropdown('open');
    if(event.target.value.trim() !== ''){
      const exp = new RegExp(event.target.value.trim(), 'gi');
      let matches = props.items.filter(x => x.match(exp));
      if(matches.length === 0) {
        matches = ['No results'];
      }
      setSearch(matches);
    } else {
      setSearch(props.items);
    }
  }

  const submit = (event) => {
    event.preventDefault();
    let item = event.target.elements.multiselect.value.trim();
    if(item !== ''){
      setSelected({...selected, [item]: true});
      props.addItem(item);
      event.target.reset();
      closeDropdown();
    }
  }

  const closeDropdown = () => {
    if(dropdown === 'open') {
      setDropdown('closed');
      setTimeout(() => {
        setDropdown('');
        setSearch(props.items);
      }, 200)
    }
  }

  const handleClickOutside = (event) => {
    if(event.target.parentNode !== parentElement.current && event.target.className !== 'selectItem' && document.activeElement !== element.current) {
      closeDropdown();
    }
  }

  useEffect(() => {
    if(props.value) {
      let tmp = {};
      props.value.forEach((value) => {
        tmp[value] = true;
      });
      setSelected(tmp);
      }
  }, [props.value])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })

  return(
    <form
      onSubmit={submit}
      id={props.id}
      className={`multiselect ${props.className ? props.className : ''}`.trim()}
      ref={parentElement}
    >
      <TextInput
        label={props.label}
        placeholder={props.placeholder}
        reference={element}
        name='multiselect'
        onChange={textChanged}
        autoComplete='off'
        id={`selectButton-${id}`}
        aria={{
          'aria-expanded': dropdown === 'open' ? true : false,
          'aria-haspopup': 'listbox',
          'aria-controls': `selectList-${id}`,
        }}
      />
      <span
        className={`arrow${props.label ? ' label' : ''}`}
        onClick={() => {
          if(!dropdown){
            element.current.focus();
            setDropdown('open');
          } 
        }}
      ></span>
      <div
        className={`dropdown ${dropdown}`}
      >
        <div>
          <ul
            role='listbox'
            tabIndex={-1}
            aria-hidden={dropdown === 'open' ? false : true}
            aria-labelledby={props.label ? `selectLabel-${id}` : null}
            id={`selectList-${id}`}
            aria-multiselectable={true}
          >
            {search.map((item, i) => 
              <li
                role='option'
                key={i}
                className={`selectItem${selected[item] ? ' selected' : ''}`}
                aria-selected={selected[item] ? true : false}
                tabIndex={0}
                onClick={() => {
                  setSelected({...selected, [item]: selected[item] ? false : true});
                  props.addItem(item);
                  closeDropdown();
                }}
              >
                {item}
              </li>  
            )}
          </ul>
        </div>
      </div>
      <div
          className='selected'
      >
        {Object.keys(selected).length > 0
          ? <>
              {Object.keys(selected).filter(item => selected[item] === true).map((item, i) =>
                <div
                  key={i}
                >
                  {item}
                  <span
                    onClick={() => {
                      let tmp = {...selected};
                      delete tmp[item];
                      setSelected(tmp);
                      props.deleteItem(item);
                    }}
                  >
                    &nbsp;✖
                  </span>
                </div>
              )}
            </>
          : 'Select one or more items'
        }
      </div>
    </form>
  );
}

export const Select = (props) => {
  const [dropdown, setDropdown] = useState('');
  const [selected, setSelected] = useState(undefined);
  const id = useId();

  const element = useRef();

  const closeDropdown = () => {
    if(dropdown === 'open'){
      setDropdown('closed');
      setTimeout(() => {
        setDropdown('');
      }, 200)
    }
  }

  const handleDropdown = () => {
    if(dropdown === 'open') {
      closeDropdown();
    } else {
      setDropdown('open');
    }
  }

  const handleClickOutside = (event) => {
    if(event.target.parentNode !== element.current && event.target.className !== 'selectItem') {
      closeDropdown();
    }
  }

  useEffect(() => {
    if(props.items && props.items.indexOf(selected) === -1 && !props.placeholder) {
      setSelected(props.items[0]);
    }
  }, [selected, props.items, props.placeholder])

  useEffect(() => {
    if(props.value && props.value !== '') {
      setSelected(props.value);
    }
  }, [props.value])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })

  return(
    <div
      id={props.id}
      className={`multiselect select ${props.label ? 'label' : ''} ${props.className ? props.className : ''}`.trim()}
      ref={element}
    >
      {props.label &&
        <span
          className='label'
          id={`selectLabel-${id}`}
        >
          {props.label}
          <br></br>
        </span>
      }
      <button
        type='button'
        className='button'
        disabled={props.disabled}
        onClick={handleDropdown}
        name={props.name}
        id={`selectButton-${id}`}
        aria-labelledby={props.label ? `selectLabel-${id}` : null}
        aria-expanded={dropdown === 'open' ? true : false}
        aria-haspopup='listbox'
        aria-controls={`selectList-${id}`}
      >
        {selected
          ? selected
          : props.placeholder
        }
      </button>
      <span
        className={`arrow${props.disabled ? ' disabled' : ''}`}
        onClick={!props.disabled ? handleDropdown : null}
      ></span>
      <div
        className={`dropdown ${dropdown}`}
      >
        <div>
          <ul
            role='listbox'
            tabindex={-1}
            aria-hidden={dropdown === 'open' ? false : true}
            aria-labelledby={props.label ? `selectLabel-${id}` : null}
            id={`selectList-${id}`}
          >
            {props.items.map((item, i) => 
              <li
                role='option'
                aria-selected={selected === item ? true : false}
                key={i}
                className={`selectItem${selected === item ? ' selected' : ''}`}
                onClick={() => {
                  setSelected(item);
                  if(props.addItem) {
                    props.addItem(item);
                  }
                  if(props.addObject) {
                    props.addObject({item: item, index: i});
                  }
                  handleDropdown();
                }}
              >
                {item}
              </li>  
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}