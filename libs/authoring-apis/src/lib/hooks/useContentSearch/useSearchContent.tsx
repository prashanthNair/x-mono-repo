import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { SearchContentListQueries } from '../../graphQL/queries/searchQueries';
import { mapFetchALL } from '../useContentListing/mapper';
import { sortedData } from '../../utils/helper';

const ROW_SIZE = 20;

interface UseContentSearchProps {
    contentType: string;
    locationState: any;
    filter: string;
    startIndex: number;
    reloadContent: any;
}

interface UseContentSearchResult {
    loading: boolean;
    error: any;
    contentList: any[];
    fetchMore: () => void;
    refetch: () => void;
}

const useContentSearch = ({
    contentType,
    locationState,
    filter,
    startIndex,
    reloadContent,
}: UseContentSearchProps): UseContentSearchResult => {
    const [contents, setContents] = useState<any>([]);

    const variables: any = mapFetchALL(locationState, filter, contentType, {
        start: startIndex,
        rows: ROW_SIZE,
    });

    const fetchQuery =
        contentType?.toLocaleLowerCase() === 'course'
            ? SearchContentListQueries.FETCH_COURSE_LIST
            : SearchContentListQueries.FETCH_CONTENT_TYPE_LIST;

    const { loading, error, data, fetchMore, refetch } = useQuery(fetchQuery, {
        variables,
        fetchPolicy: 'no-cache',
    });

    useEffect(() => {
        console.log("Today check",data)
        setContents(sortedData(data?.authoring_getContentTypeItems || data?.authoring_recentContents || []));
    }, [data]);
    console.log("check3",contents)

    const fetchMoreContent = async () => {
        try {
            const result = await fetchMore({
                variables: {
                    ...variables,
                    pagination: {
                        start: contents.length,
                        rows: ROW_SIZE,
                    },
                },
            });

            const fetchMoreData = result.data?.authoring_getContentTypeItems || [];
            const combinedData: any = [...contents, ...fetchMoreData];
            console.log("combinedData",combinedData);
            setContents(combinedData);

            console.log("22222",result);
        } catch (error) {
            console.error(error);
        }
    };
    const refresh = async () => {
        await refetch(variables);
    };
    return { loading, error, contentList: contents, fetchMore: fetchMoreContent, refetch: refresh };
    
};

export default useContentSearch;
