import { useMemo } from 'react';
import { Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { SubmitHandler } from 'react-hook-form';
import { dataCategories } from '../../../consts/data-categories';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addSelector,
  selectNewPrivSelectors,
  PrivSelector,
  removeAllSelectors,
  removeSelector,
  useAddSelectorsMutation,
  useGetPrivacyScopeDimenstionsQuery,
} from '../../../store/privConfigSlice';
import SubmitButton from '../../common/SubmitButton';
import CreateSelector from './CreateSelector';
import SelectorList from './SelectorList';

export function SelectorsConfig({ token }: { token: string }) {
  const dispatch = useAppDispatch();
  const newPrivSelectors = useAppSelector(selectNewPrivSelectors);

  const [add, addState] = useAddSelectorsMutation();

  const { data, isSuccess, isError, isFetching, isLoading } =
    useGetPrivacyScopeDimenstionsQuery(token);

  const selectors = useMemo(() => {
    return data?.data_categories.filter((dc) => !dataCategories.includes(dc));
  }, [data]);

  const onSubmit: SubmitHandler<PrivSelector> = async (data) => {
    const payload = newPrivSelectors.map((s) => ({
      name: s.name,
      data_category: s.dataCategory,
    }));

    const res = await add([token, payload]);
    if ('data' in res) {
      dispatch(removeAllSelectors());
    }
  };

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      )}
      {isSuccess && selectors && (
        <>
          <h3>Existing</h3>
          <SelectorList selectors={selectors} isFetching={isFetching} />

          <h3 className="mt-5">New</h3>
          <div className="list-group list-group-light overflow-auto mt-2">
            {newPrivSelectors.map((s) => (
              <div
                key={`${s.dataCategory}.${s.name}`}
                className="list-group-item d-flex justify-content-between align-items-center px-3 border-0 rounded-3 mb-2 list-group-item-light"
              >
                <div
                  className="fw-bold text-muted"
                  style={{ fontSize: '120%' }}
                >
                  {s.dataCategory}.{s.name}
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(removeSelector(s))}
                  className="btn-close me-2"
                ></button>
              </div>
            ))}
          </div>
          <CreateSelector
            selectors={selectors}
            onSubmit={(s) => dispatch(addSelector(s))}
          />

          <div className="text-end mt-5">
            <span
              onClick={() => dispatch(removeAllSelectors())}
              className="btn btn-sm btn-neutral me-2"
            >
              Reset
            </span>
            <SubmitButton
              label="Save"
              onClick={onSubmit}
              isLoading={addState.isLoading}
            />
          </div>
        </>
      )}
      {isError && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )}
    </>
  );
}

export default SelectorsConfig;
