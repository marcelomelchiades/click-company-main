import React, { useEffect, useState } from 'react';

type TabsProps = {
	allTabs: {
		tabHeader: string;
		tabActive: boolean;
		tabContent: JSX.Element;
	}[];
};

const Tabs: React.FC<TabsProps> = ({ allTabs }) => {
	const [stateAllTabs, setStateAllTabs] = useState(allTabs);

	function onlyOneTabActive(currentTab: any = null) {
		let controlaUnicaTabAtiva = false;
		const newStateAllTabs: TabsProps['allTabs'] = [];

		allTabs.map(tab => {
			const newTab = tab;

			if (currentTab === null) {
				if (controlaUnicaTabAtiva && tab.tabActive) {
					newTab.tabActive = false;
				}

				if (newTab.tabActive) {
					controlaUnicaTabAtiva = true;
				}
			} else {
				newTab.tabActive = tab === currentTab;
			}

			newStateAllTabs.push(newTab);

			return null;
		});

		setStateAllTabs(newStateAllTabs);
	}

	useEffect(() => {
		setStateAllTabs(allTabs);
		onlyOneTabActive();
		console.log(allTabs);
	}, [allTabs]);

	return (
		<div className={`tabs-custom`}>
			<div
				className={`navigation-tabs-custom grid grid-cols-${stateAllTabs.length}`}
			>
				{stateAllTabs.map(tab => {
					const activeTab = tab.tabActive ? 'tab-active' : null;
					return (
						<button
							type="button"
							className={`tab-custom ${activeTab}`}
							onClick={() => {
								onlyOneTabActive(tab);
							}}
						>
							{tab.tabHeader}
						</button>
					);
				})}
			</div>
			<div className="content-tabs-custom">
				{stateAllTabs.map(tab => {
					const returnContent = tab.tabActive ? tab.tabContent : null;
					return returnContent;
				})}
			</div>
		</div>
	);
};

export default Tabs;
