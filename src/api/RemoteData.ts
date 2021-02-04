export enum RemoteDataType {
  NotRequested = 'NotRequested',
  Appending = 'Appending',
  Loading = 'Loading',
  Refreshing = 'Refreshing',
  Failure = 'Failure',
  Success = 'Success',
}

type NotRequestedType = {
  type: RemoteDataType.NotRequested;
};

type LoadingType = {
  type: RemoteDataType.Loading;
};

export type AppendingType<T> = {
  type: RemoteDataType.Appending;
  data: T;
};

type RefreshingType<T> = {
  type: RemoteDataType.Refreshing;
  data: T;
};

export type FailureType<E> = {
  type: RemoteDataType.Failure;
  error: E;
};

export type SuccessType<T> = {
  type: RemoteDataType.Success;
  data: T;
};

// Constructors

export const NotRequested: NotRequestedType = {
  type: RemoteDataType.NotRequested,
};

export const Loading: LoadingType = {type: RemoteDataType.Loading};

export const Appending = <T>(data: T): AppendingType<T> => ({
  type: RemoteDataType.Appending,
  data,
});

export const Refreshing = <T>(data: T): RefreshingType<T> => ({
  type: RemoteDataType.Refreshing,
  data,
});

export const Failure = <E>(error: E): FailureType<E> => ({
  type: RemoteDataType.Failure,
  error,
});

export const Success = <T>(data: T): SuccessType<T> => ({
  type: RemoteDataType.Success,
  data,
});

export type RemoteData<T, E> =
  | NotRequestedType
  | LoadingType
  | AppendingType<T>
  | RefreshingType<T>
  | FailureType<E>
  | SuccessType<T>;

export const isNotRequested = <T, E>(
  remoteData: RemoteData<T, E>,
): remoteData is NotRequestedType =>
  remoteData.type === RemoteDataType.NotRequested;

export const isLoading = <T, E>(
  remoteData: RemoteData<T, E>,
): remoteData is LoadingType => remoteData.type === RemoteDataType.Loading;

export const isRefreshing = <T, E>(
  remoteData: RemoteData<T, E>,
): remoteData is RefreshingType<T> =>
  remoteData.type === RemoteDataType.Refreshing;

export const isAppending = <T, E>(
  remoteData: RemoteData<T, E>,
): remoteData is AppendingType<T> =>
  remoteData.type === RemoteDataType.Appending;

export const isFailure = <T, E>(
  remoteData: RemoteData<T, E>,
): remoteData is FailureType<E> => remoteData.type === RemoteDataType.Failure;

export const isSuccess = <T, E>(
  remoteData: RemoteData<T, E>,
): remoteData is SuccessType<T> => remoteData.type === RemoteDataType.Success;

export const hasData = <T, E>(
  remoteData: RemoteData<T, E>,
): remoteData is SuccessType<T> | RefreshingType<T> | AppendingType<T> =>
  isSuccess(remoteData) || isRefreshing(remoteData) || isAppending(remoteData);
