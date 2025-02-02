import { MutationMode, OnSuccess, OnFailure } from '../types';
import { DeclarativeSideEffect } from './useDeclarativeSideEffects';
/**
 * Get a callback to fetch the data provider through Redux, usually for mutations.
 *
 * The request starts when the callback is called.
 *
 * useMutation() parameters can be passed:
 *
 * - at definition time
 *
 *       const [mutate] = useMutation(query, options); mutate();
 *
 * - at call time
 *
 *       const [mutate] = useMutation(); mutate(query, options);
 *
 * - both, in which case the definition and call time parameters are merged
 *
 *       const [mutate] = useMutation(query1, options1); mutate(query2, options2);
 *
 * @param {Object} query
 * @param {string} query.type The method called on the data provider, e.g. 'getList', 'getOne'. Can also be a custom method if the dataProvider supports is.
 * @param {string} query.resource A resource name, e.g. 'posts', 'comments'
 * @param {Object} query.payload The payload object, e.g; { post_id: 12 }
 * @param {Object} options
 * @param {string} options.action Redux action type
 * @param {boolean} options.undoable Set to true to run the mutation locally before calling the dataProvider
 * @param {boolean} options.returnPromise Set to true to return the result promise of the mutation
 * @param {Function} options.onSuccess Side effect function to be executed upon success, e.g. () => refresh()
 * @param {Function} options.onFailure Side effect function to be executed upon failure, e.g. (error) => notify(error.message)
 * @param {boolean} options.withDeclarativeSideEffectsSupport Set to true to support legacy side effects e.g. { onSuccess: { refresh: true } }
 *
 * @returns A tuple with the mutation callback and the request state. Destructure as [mutate, { data, total, error, loading, loaded }].
 *
 * The return value updates according to the request state:
 *
 * - mount:         [mutate, { loading: false, loaded: false }]
 * - mutate called: [mutate, { loading: true, loaded: false }]
 * - success:       [mutate, { data: [data from response], total: [total from response], loading: false, loaded: true }]
 * - error:         [mutate, { error: [error from response], loading: false, loaded: true }]
 *
 * The mutate function accepts the following arguments
 * - {Object} query
 * - {string} query.type The method called on the data provider, e.g. 'update'
 * - {string} query.resource A resource name, e.g. 'posts', 'comments'
 * - {Object} query.payload The payload object, e.g. { id: 123, data: { isApproved: true } }
 * - {Object} options
 * - {string} options.action Redux action type
 * - {boolean} options.undoable Set to true to run the mutation locally before calling the dataProvider
 * - {boolean} options.returnPromise Set to true to return the result promise of the mutation
 * - {Function} options.onSuccess Side effect function to be executed upon success or failure, e.g. { onSuccess: response => refresh() }
 * - {Function} options.onFailure Side effect function to be executed upon failure, e.g. { onFailure: error => notify(error.message) }
 * - {boolean} withDeclarativeSideEffectsSupport Set to true to support legacy side effects e.g. { onSuccess: { refresh: true } }
 *
 * @example
 *
 * // pass parameters at definition time
 * // use when all parameters are determined at definition time
 * // the mutation callback can be used as an even handler
 * // because Event parameters are ignored
 * import { useMutation } from 'react-admin';
 *
 * const ApproveButton = ({ record }) => {
 *     const [approve, { loading }] = useMutation({
 *         type: 'update',
 *         resource: 'comments',
 *         payload: { id: record.id, data: { isApproved: true } }
 *     });
 *     return <Button label="Approve" onClick={approve} disabled={loading} />;
 * };
 *
 * @example
 *
 * // pass parameters at call time
 * // use when some parameters are only known at call time
 * import { useMutation } from 'react-admin';
 *
 * const ApproveButton = ({ record }) => {
 *     const [mutate, { loading }] = useMutation();
 *     const approve = event => mutate({
 *         type: 'update',
 *         resource: 'comments',
 *         payload: {
 *             id: event.target.dataset.id,
 *             data: { isApproved: true, updatedAt: new Date() }
 *         },
 *     });
 *     return <Button
 *         label="Approve"
 *         onClick={approve}
 *         disabled={loading}
 *     />;
 * };
 *
 * @example
 *
 * // use the second argument to pass options
 * import { useMutation, useNotify, CRUD_UPDATE } from 'react-admin';
 *
 * const ResetStockButton = ({ record }) => {
 *     const [mutate, { loading }] = useMutation();
 *     const notify = useNotify();
 *     const handleClick = () => mutate(
 *         {
 *              type: 'update',
 *              resource: 'items',
 *              payload: { id: record.id, data: { stock: 0 } }
 *         },
 *         {
 *              undoable: true,
 *              action: CRUD_UPDATE,
 *              onSuccess: response => notify('Success !'),
 *              onFailure: error => notify('Failure !')
 *         }
 *     );
 *     return <Button label="Reset stock" onClick={handleClick} disabled={loading} />;
 * };
 */
declare const useMutation: (query?: Mutation, options?: MutationOptions) => UseMutationValue;
export interface Mutation {
    type: string;
    resource?: string;
    payload: object;
}
export interface MutationOptions {
    action?: string;
    returnPromise?: boolean;
    onSuccess?: OnSuccess | DeclarativeSideEffect;
    onFailure?: OnFailure | DeclarativeSideEffect;
    withDeclarativeSideEffectsSupport?: boolean;
    /** @deprecated use mutationMode: undoable instead */
    undoable?: boolean;
    mutationMode?: MutationMode;
}
export declare type UseMutationValue = [
    (query?: Partial<Mutation>, options?: Partial<MutationOptions>) => void | Promise<any>,
    {
        data?: any;
        total?: number;
        error?: any;
        loading: boolean;
        loaded: boolean;
    }
];
export default useMutation;
