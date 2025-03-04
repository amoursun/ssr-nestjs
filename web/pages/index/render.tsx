import { SProps } from 'ssr-types'
import Rectangle from '@/components/rectangle'
import Search from '@/components/search'
import { IData } from '~/typings/data'
import { useStore } from 'ssr-common-utils'

export default function Index(props: SProps) {
	const { indexState: state } = useStore<{ indexState: IData }>()
	return (
		<div className="index-page-container">
			<Search></Search>
			{state?.indexData?.data?.[0]?.components ? (
				<div>
					<Rectangle {...props} data={state.indexData.data[1].components} />
				</div>
			) : (
				<img src="https://gw.alicdn.com/tfs/TB1v.zIE7T2gK0jSZPcXXcKkpXa-128-128.gif" className="loading" />
			)}
		</div>
	)
}
