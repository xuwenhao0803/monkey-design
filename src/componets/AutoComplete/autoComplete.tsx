import React, {
  FC,
  ChangeEvent,
  useState,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import Transition from '../Transition/transition'
import useClickOutside from "../../hooks/useOutSide";
import classnames from "classnames";
interface DataSourceObject {
  [key: string]: any;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [ showDropdown, setShowDropdown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const completeRef = useRef<any>();
  const DebounceValue = useDebounce(inputValue, 500);
  useClickOutside(completeRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    if (DebounceValue && triggerSearch.current) {
      setSuggestions([])
      const result = fetchSuggestions(DebounceValue);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((res) => {
          setSuggestions(res);
          if (res.length > 0) {
            setShowDropdown(true)
          }
          setLoading(false);
        });
      } else {
        setSuggestions(result);

        if (result.length > 0) {
          setShowDropdown(true)
        } 
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
    // eslint-disable-next-line
  }, [DebounceValue]);

  const hanleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    triggerSearch.current = true;
    setInputValue(value);
  };
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          clickItem(suggestions[highlightIndex]);
        }

        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  const clickItem = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);

    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  const rendertemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const listTable = () => {
    return suggestions.map((item, index) => {
      const cnames = classnames("suggestion-item", {
        "high-light": index === highlightIndex,
      });
      return (
        <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {setSuggestions([])}}
      >
        <ul className="suggestion-list">
          <li className={cnames} onClick={() => clickItem(item)}>
            {rendertemplate(item)}
          </li>
        </ul>
        </Transition>
      );
    });
  };
  return (
    <div className="auto-complete" ref={completeRef}>
      <Input
        value={inputValue}
        {...restProps}
        onChange={hanleChange}
        onKeyDown={handleKeyDown}
      ></Input>
      {loading && (
        <ul>
          <Icon className="suggstions-loading-icon" icon="spinner" spin></Icon>
        </ul>
      )}
      {suggestions.length > 0 && listTable()}
    </div>
  );
};

export default AutoComplete;
